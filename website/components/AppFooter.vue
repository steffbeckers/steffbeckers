<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
</script>

<template>
  <div
    class="flex flex-col sm:flex-row items-center sm:justify-between gap-2 max-w-4xl mx-auto px-4 py-4 w-full text-sm"
  >
    <div>&copy; {{ new Date().getFullYear() }} - Steff Beckers</div>
    <div>Last updated on {{ formatDateTime(runtimeConfig.public.lastUpdatedOn) }}</div>
  </div>
</template>
