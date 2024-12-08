<script setup lang="ts">
const appConfig = useAppConfig();
</script>

<template>
  <div class="flex justify-between gap-4 max-w-4xl mx-auto px-4 py-4 w-full text-sm">
    <div>&copy; {{ new Date().getFullYear() }} - Steff Beckers</div>
    <div>Last updated on {{ formatDate(appConfig.lastUpdatedOn) }}</div>
  </div>
</template>
