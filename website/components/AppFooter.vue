<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
</script>

<template>
  <div
    class="flex flex-col sm:flex-row items-center sm:justify-between gap-2 max-w-4xl mx-auto px-4 py-4 w-full text-xs"
  >
    <div>&copy; {{ new Date().getFullYear() }} Steff Beckers. {{ $t("AllRightsReserved") }}.</div>
    <div>{{ $t("LastUpdatedOn") }} {{ formatDateTime(runtimeConfig.public.lastUpdatedOn) }}</div>
  </div>
</template>
