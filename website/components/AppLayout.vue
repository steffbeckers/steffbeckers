<script setup lang="ts">
const { cover } = useAppConfig();
</script>

<template>
  <Html lang="en" />
  <Meta property="og:image" :content="cover" />
  <NuxtLoadingIndicator />
  <AppNavbar />
  <slot />
  <AppFooter />
</template>

<style lang="postcss">
body {
  @apply bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-100 overflow-y-scroll;
}

p:last-of-type {
  @apply mb-0;
}
</style>
