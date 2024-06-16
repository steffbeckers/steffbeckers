export default defineNuxtConfig({
  content: {
    markdown: {
      remarkPlugins: ["remark-unwrap-images"],
    },
  },
  extends: "content-wind",
});
