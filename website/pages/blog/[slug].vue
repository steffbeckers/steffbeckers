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
      <aside class="flex-shrink-0" v-if="document.toc.value.links.length > 0">
        <h2>Contents</h2>
        <nav>
          <ul>
            <li v-for="link in document.toc.value.links" :key="link.id">
              <a :href="`#${link.id}`">{{ link.text }}</a>
              <ul>
                <li v-for="child in link.children" :key="child.id">
                  <a :href="`#${child.id}`">{{ child.text }}</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>
      <ContentDoc :document="document" />
    </article>
    <section>
      <h2>Leave a comment or question</h2>
      <DisqusComments :identifier="route.path" />
    </section>
  </NuxtLayout>
</template>
