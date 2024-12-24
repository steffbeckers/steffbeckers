<template>
  <h4 class="subtitle">
    <ContentSlot :use="$slots.default" unwrap="p" />
  </h4>
</template>

<style lang="postcss" scoped>
.subtitle {
  @apply font-bold font-mono text-primary-400;
}
</style>
