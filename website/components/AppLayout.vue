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
  @apply bg-gray-50 text-black dark:bg-gray-900 dark:text-white overflow-y-scroll;
}
</style>
