import os
import hashlib
import json
from transformers import AutoTokenizer, AutoModelForCausalLM
from sentence_transformers import SentenceTransformer
from pymilvus import connections, Collection, FieldSchema, CollectionSchema, DataType
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

# Paths and configuration
CODEBASE_PATH = "/path/to/your/codebase"  # Update to your codebase path
HASH_FILE = "file_hashes.json"
MILVUS_HOST = "localhost"
MILVUS_PORT = "19530"
COLLECTION_NAME = "codebase"

# Load embedding model (for similarity search)
embedding_model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

# Load Code Llama for code generation
model_name = "meta/code-llama-7b"  # Adjust model variant based on your system's resources
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name, device_map="auto", torch_dtype="auto")

# Connect to Milvus
connections.connect("default", host=MILVUS_HOST, port=MILVUS_PORT)

# Define Milvus collection schema
id_field = FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, auto_id=True)
code_field = FieldSchema(name="code_text", dtype=DataType.VARCHAR, max_length=500)
vector_field = FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=384)
schema = CollectionSchema(fields=[id_field, code_field, vector_field], description="Codebase collection")

# Create or load Milvus collection
collection = Collection(name=COLLECTION_NAME, schema=schema)

# Function to calculate file hash
def calculate_file_hash(filepath):
    with open(filepath, "rb") as f:
        return hashlib.md5(f.read()).hexdigest()

# Function to generate embeddings
def get_code_embedding(code_text):
    return embedding_model.encode(code_text).tolist()

# Function to generate code with Code Llama
def generate_code(prompt, max_length=200):
    inputs = tokenizer(prompt, return_tensors="pt").to("cuda")  # Ensure tensors are on GPU
    outputs = model.generate(inputs.input_ids, max_length=max_length, temperature=0.7)
    return tokenizer.decode(outputs[0], skip_special_tokens=True)

# Function to index the entire codebase
def index_codebase(collection, codebase_path, hash_file):
    if os.path.exists(hash_file):
        with open(hash_file, "r") as f:
            file_hashes = json.load(f)
    else:
        file_hashes = {}

    for root, _, files in os.walk(codebase_path):
        for file in files:
            if not file.endswith(".py"):  # Adjust file extension as needed
                continue

            filepath = os.path.join(root, file)
            file_hash = calculate_file_hash(filepath)

            # Skip if the file hasn't changed
            if file_hashes.get(filepath) == file_hash:
                continue

            # Read file content
            with open(filepath, "r") as f:
                code_text = f.read()

            # Generate embedding and insert into Milvus
            embedding = get_code_embedding(code_text)
            collection.insert([{"code_text": code_text, "embedding": embedding}])

            # Update file hash
            file_hashes[filepath] = file_hash

    # Save updated hashes
    with open(hash_file, "w") as f:
        json.dump(file_hashes, f)

# File system event handler for real-time indexing
class CodebaseEventHandler(FileSystemEventHandler):
    def __init__(self, collection, hash_file):
        self.collection = collection
        self.hash_file = hash_file

    def on_modified(self, event):
        if event.is_directory or not event.src_path.endswith(".py"):
            return

        filepath = event.src_path
        file_hash = calculate_file_hash(filepath)

        # Check if file hash has changed
        with open(self.hash_file, "r") as f:
            file_hashes = json.load(f)

        if file_hashes.get(filepath) == file_hash:
            return

        # Reindex the modified file
        with open(filepath, "r") as f:
            code_text = f.read()

        embedding = get_code_embedding(code_text)
        self.collection.insert([{"code_text": code_text, "embedding": embedding}])

        # Update file hash
        file_hashes[filepath] = file_hash
        with open(self.hash_file, "w") as f:
            json.dump(file_hashes, f)

# Function to query the codebase using natural language
def query_codebase(collection, natural_language_query):
    # Search in Milvus
    results = collection.search(
        data=[get_code_embedding(natural_language_query)],
        anns_field="embedding",
        param={"metric_type": "L2", "params": {"nprobe": 10}},
        limit=5
    )

    # Prepare prompt with retrieved code snippets
    snippets = [result.entity.get("code_text") for result in results[0]]
    prompt = "Given the following code snippets:\n"
    prompt += "\n".join(snippets)
    prompt += f"\n\nRespond to the query: {natural_language_query}"

    # Generate response
    return generate_code(prompt)

# Main execution
if __name__ == "__main__":
    # Initial indexing
    index_codebase(collection, CODEBASE_PATH, HASH_FILE)

    # Start file system monitoring
    event_handler = CodebaseEventHandler(collection, HASH_FILE)
    observer = Observer()
    observer.schedule(event_handler, CODEBASE_PATH, recursive=True)
    observer.start()

    print("Codebase indexing and monitoring started. Use Ctrl+C to stop.")

    try:
        while True:
            query = input("Enter a natural language query: ")
            response = query_codebase(collection, query)
            print(f"Generated Code:\n{response}\n")
    except KeyboardInterrupt:
        observer.stop()

    observer.join()
