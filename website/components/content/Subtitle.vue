<script setup lang="ts">
const props = defineProps({
  primary: Boolean,
});
</script>

<template>
  <h4 :class="props.primary ? 'primary' : ''">
    <ContentSlot :use="$slots.default" unwrap="p" />
  </h4>
</template>

<style lang="postcss" scoped>
h4 {
  @apply font-bold font-mono;
  @apply text-gray-500;

  &.primary {
    @apply text-primary-400;
  }
}
</style>
