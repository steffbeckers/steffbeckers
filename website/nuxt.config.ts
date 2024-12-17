import fs from "fs";
import path from "path";

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
  hooks: {
    "build:before"() {
      const lastUpdatedOn = new Date().toISOString();

      // Read existing .env content
      const envPath = path.resolve(process.cwd(), ".env");
      let envContent = "";
      if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, "utf8");
      }

      // Replace or append lastUpdatedOn
      const lastUpdateOnKey = "LAST_UPDATED_ON";
      const newContent = envContent
        .split("\n")
        .filter((line) => !line.startsWith(`${lastUpdateOnKey}=`))
        .concat(`${lastUpdateOnKey}=${lastUpdatedOn}`)
        .join("\n");

      // Write updated content back to .env
      fs.writeFileSync(envPath, newContent, "utf-8");

      console.log(`Set ${lastUpdateOnKey}=${lastUpdatedOn} in .env`);
    },
  },
  modules: ["@nuxtjs/sitemap", "nuxt-feedme"],
  runtimeConfig: {
    public: {
      lastUpdatedOn: process.env.LAST_UPDATED_ON,
    },
  },
  site: {
    url: "https://steffbeckers.eu",
  },
});
