const now = new Date().toISOString();

export default defineNuxtConfig({
  compatibilityDate: "2024-12-15",
  content: {
    markdown: {
      anchorLinks: {
        depth: 3,
      },
      remarkPlugins: ["remark-reading-time", "remark-unwrap-images"],
    },
  },
  cookieControl: {
    cookies: {
      optional: [
        {
          name: "Google Analytics",
          id: "google-analytics",
          targetCookieIds: ["_ga", "_gid", "_gat", "_gac_"],
        },
      ],
      necessary: [],
    },
    locales: ["en"],
    localeTexts: {
      en: {
        bannerDescription:
          "I use third-party cookies so that I can better understand how my website is used.",
        manageCookies: "Manage",
      },
    },
  },
  disqus: {
    shortname: "steffbeckers",
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
  googleFonts: {
    families: {
      "Fira Code": "400..700",
      Inter: "400..700",
    },
  },
  gtag: {
    id: "G-SD81308FFY",
    initCommands: [
      [
        "consent",
        "default",
        {
          ad_user_data: "denied",
          ad_personalization: "denied",
          ad_storage: "denied",
          analytics_storage: "denied",
          wait_for_update: 500,
        },
      ],
    ],
  },
  hooks: {
    "build:before"() {
      process.env.LAST_UPDATED_ON = now;
      console.log("process.env.LAST_UPDATED_ON", process.env.LAST_UPDATED_ON);
    },
  },
  mdc: {
    highlight: {
      langs: [
        "bash",
        "css",
        "html",
        "js",
        "json",
        "jsx",
        "md",
        "mdc",
        "powershell",
        "ts",
        "tsx",
        "vue",
        "yaml",
      ],
    },
  },
  modules: [
    "@dargmuesli/nuxt-cookie-control",
    "@nuxtjs/google-fonts",
    "@nuxtjs/sitemap",
    "nuxt-disqus",
    "nuxt-feedme",
    "nuxt-gtag",
  ],
  runtimeConfig: {
    public: {
      lastUpdatedOn: process.env.LAST_UPDATED_ON ?? now,
    },
  },
  site: {
    url: "https://steffbeckers.eu",
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          fontFamily: {
            mono: ["Fira Code", "monospace"],
            sans: ["Inter", "sans-serif"],
          },
        },
      },
    },
  },
});
