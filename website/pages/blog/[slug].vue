<script setup lang="ts">
const document = await useContent();
const route = await useRoute();
</script>

<template>
  <NuxtLayout>
    <article>
      <h1>{{ document.page.value.title }}</h1>
      <subtitle>
        {{ formatDate(document.page.value.date) }} | {{ document.page.value.readingTime.text }} |
        <DisqusCount style="text-transform: lowercase" :identifier="document.page.value._path" />
      </subtitle>
      <p>{{ document.page.value.description }}</p>
      <ContentDoc :document="document" />
    </article>
    <section>
      <h2>Leave a comment or question</h2>
      <DisqusComments :identifier="route.path" />
    </section>
  </NuxtLayout>
</template>
