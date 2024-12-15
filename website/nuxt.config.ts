export default defineNuxtConfig({
  compatibilityDate: "2024-12-15",
  content: {
    markdown: {
      anchorLinks: false,
      remarkPlugins: ["remark-unwrap-images"],
    },
  },
  extends: "content-wind",
  feedme: {
    feeds: {
      "/blog.xml": {
        content: true,
        revisit: "6h",
        item: {
          query: {
            limit: 100,
            where: [
              {
                $and: [
                  {
                    _path: /^\/blog\/[^\/]+$/,
                  },
                  {
                    _draft: false,
                  },
                ],
              },
            ],
          },
        },
        type: "rss2",
        feed: {
          defaults: {
            author: {
              name: "Steff Beckers",
              email: "steff@steffbeckers.eu",
              link: "https://steffbeckers.eu",
            },
            categories: ["Development", "DevOps"],
            description: "Tutorials, scripts and other useful notes",
            link: "https://steffbeckers.eu/blog",
            title: "Steff Beckers Blog",
          },
        },
      },
    },
  },
  modules: ["@nuxtjs/sitemap", "nuxt-feedme"],
  site: {
    url: "https://steffbeckers.eu",
  },
});
