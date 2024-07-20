<script setup lang="ts">
const appConfig = useAppConfig();
</script>

<template>
  <div class="flex justify-center px-4 py-4 sm:px-8 w-full text-sm">
    &copy; {{ new Date().getFullYear() }} - Steff Beckers / Last updated on
    {{ formatDate(appConfig.lastUpdatedOn) }}
  </div>
</template>
