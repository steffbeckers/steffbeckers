<script setup>
defineProps({
  href: {
    type: String,
    required: true,
  },
  external: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: "",
  },
  target: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <span class="not-prose">
    <NuxtLink
      :to="href"
      :target="target"
      :external="external"
      class="inline-flex items-center gap-1 text-white bg-gray-700 dark:bg-white dark:text-gray-900 hover:bg-primary-400 dark:hover:bg-primary-400 dark:hover:text-white dark px-3 py-1 rounded no-underline"
    >
      <Icon v-if="icon" :name="icon" class="w-4 h-4 mr-1" />
      <ContentSlot :use="$slots.default" unwrap="p" />
    </NuxtLink>
  </span>
</template>
