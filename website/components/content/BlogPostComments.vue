<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <DiscusComments :identifier="route.path" />
</template>
