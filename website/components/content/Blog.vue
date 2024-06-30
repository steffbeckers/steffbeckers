<template>
  <a href="/blog.xml" target="_blank" rel="noopener noreferrer">
    <Icon name="ri:rss-line" size="24px" style="float: right"></Icon>
  </a>
  <h1>Blog</h1>
  <p class="text-primary-400 font-bold">Tutorials, scripts and other useful notes</p>
  <ContentList
    :query="{
      path: '/blog/',
      sort: [{ date: -1 }],
    }"
  >
    <template #default="{ list }">
      <NuxtLink v-for="article in list" :key="article._path" :to="article._path">
        <h2 class="my-2">{{ article.title }}</h2>
        <h4>{{ formatDate(article.date) }}</h4>
        <p>{{ article.description }}</p>
      </NuxtLink>
    </template>
    <template #not-found>
      <p>No articles found.</p>
    </template>
  </ContentList>
</template>
