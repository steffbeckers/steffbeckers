<template>
  <h4 class="subtitle">
    <ContentSlot :use="$slots.default" unwrap="p" />
  </h4>
</template>

<style lang="postcss">
.subtitle {
  @apply font-bold text-primary-400;
}
</style>
