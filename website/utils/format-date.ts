export default (dateString: string) =>
  new Date(dateString).toLocaleString("en-BE", {
    dateStyle: "short",
  });
