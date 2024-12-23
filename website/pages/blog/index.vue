<script setup lang="ts">
useHead({
  title: "Blog - Steff Beckers",
  meta: [
    {
      name: "description",
      content: "Tutorials, scripts and other useful notes.",
    },
    {
      name: "keywords",
      content: "Steff, Beckers, Development, DevOps, Scripts, Notes, Tutorials, Blog",
    },
  ],
});

const searchTerm = ref("");
</script>

<template>
  <NuxtLayout>
    <div class="hidden sm:flex sm:float-right gap-4">
      <input
        class="appearance-none border rounded w-full py-2 px-3 text-gray-900 dark:text-white dark:bg-gray-900 dark:border-black leading-tight focus:outline-none focus:shadow-outline"
        v-model="searchTerm"
        placeholder="Search"
      />
      <a href="/blog.xml" target="_blank" rel="noopener noreferrer">
        <Icon name="ri:rss-line" size="40px"></Icon>
      </a>
    </div>
    <h1>Blog</h1>
    <p class="text-primary-400 font-bold">Tutorials, scripts and other useful notes</p>
    <div class="flex gap-4 my-6 sm:hidden">
      <input
        class="appearance-none border rounded w-full py-2 px-3 text-gray-900 dark:text-white dark:bg-gray-900 dark:border-black leading-tight focus:outline-none focus:shadow-outline"
        v-model="searchTerm"
        placeholder="Search"
      />
      <a href="/blog.xml" target="_blank" rel="noopener noreferrer">
        <Icon name="ri:rss-line" size="40px"></Icon>
      </a>
    </div>
    <!-- TODO: Search is not working -->
    <ContentList
      :query="{
        path: '/blog/',
        sort: [{ date: -1 }],
        where: searchTerm ? [{ title: { $icontains: searchTerm } }] : [],
      }"
    >
      <template #default="{ list }">
        <NuxtLink v-for="(post, index) in list" :key="post._path" :to="post._path">
          <h2 class="mt-0">{{ post.title }}</h2>
          <h4>
            {{ formatDate(post.date) }} | {{ post.readingTime.text }} |
            <DisqusCount style="text-transform: lowercase" :identifier="post._path" />
          </h4>
          <p>{{ post.description }}</p>
          <hr v-if="index !== list.length - 1" />
        </NuxtLink>
      </template>
      <template #not-found>
        <p>No posts found.</p>
      </template>
    </ContentList>
  </NuxtLayout>
</template>
