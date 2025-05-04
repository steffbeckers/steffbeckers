<script setup lang="ts">
const { fallbackLocale, locale, t } = useI18n();

useHead({
  title: "Blog",
  meta: [
    {
      name: "description",
      content: t("BlogSubtitle"),
    },
    {
      name: "keywords",
      content: t("BlogKeywords"),
    },
  ],
});

defineI18nRoute({
  paths: {
    en: "/blog",
    nl: "/blog",
  },
});

const contentListPath = `/${locale.value !== fallbackLocale.value ? locale.value + "/" : ""}blog/`;

// TODO: Implement search
// const searchTerm = ref("");
</script>

<template>
  <NuxtLayout>
    <a class="float-right" href="/blog.xml" target="_blank" rel="noopener noreferrer">
      <Icon name="ri:rss-line" size="40px"></Icon>
    </a>
    <!-- TODO: Implement search -->
    <!-- <div class="hidden sm:flex sm:float-right gap-4">
      <input
        class="appearance-none border rounded w-full py-2 px-3 text-gray-900 dark:text-white dark:bg-gray-900 dark:border-black leading-tight focus:outline-none focus:shadow-outline"
        v-model="searchTerm"
        placeholder="Search"
      />
      <a href="/blog.xml" target="_blank" rel="noopener noreferrer">
        <Icon name="ri:rss-line" size="40px"></Icon>
      </a>
    </div> -->
    <h1>{{ $t("Blog") }}</h1>
    <subtitle :primary="true">{{ $t("BlogSubtitle") }}</subtitle>
    <!-- TODO: Implement search -->
    <!-- <div class="flex gap-4 my-6 sm:hidden">
      <input
        class="appearance-none border rounded w-full py-2 px-3 text-gray-900 dark:text-white dark:bg-gray-900 dark:border-black leading-tight focus:outline-none focus:shadow-outline"
        v-model="searchTerm"
        placeholder="Search"
      />
      <a href="/blog.xml" target="_blank" rel="noopener noreferrer">
        <Icon name="ri:rss-line" size="40px"></Icon>
      </a>
    </div> -->
    <ContentList
      :query="{
        path: contentListPath,
        sort: [{ date: -1 }],
        // TODO: Implement search
        // where: searchTerm ? [{ title: { $icontains: searchTerm } }] : [],
      }"
    >
      <template #default="{ list }">
        <template v-for="(post, index) in list" :key="post._path">
          <NuxtLink :to="post._path">
            <article class="post">
              <h2 class="mt-0">{{ post.title }}</h2>
              <subtitle>
                {{ formatDateTime(post.date) }} | {{ post.readingTime.text }} |
                <DisqusCount :identifier="post._path" /> {{ $t("Comments").toLowerCase() }}
              </subtitle>
              <p>{{ post.description }}</p>
            </article>
          </NuxtLink>
          <hr v-if="index !== list.length - 1" />
        </template>
      </template>
      <template #not-found>
        <p>{{ $t("NoPostsFound") }}</p>
      </template>
    </ContentList>
  </NuxtLayout>
</template>

<style lang="postcss" scoped>
article.post:hover {
  > h2 {
    @apply text-primary-400;
  }

  > p {
    @apply text-white;
  }
}
</style>
