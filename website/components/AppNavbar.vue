<script setup lang="ts">
const { navigation } = useContent();
const route = await useRoute();
</script>

<template>
  <div class="flex items-center justify-between flex-wrap gap-4 max-w-4xl py-4 mx-auto px-4">
    <!-- Profile -->
    <NuxtLink class="flex-shrink-0" to="/">
      <Logo />
    </NuxtLink>
    <!-- Navigation -->
    <div class="flex flex-wrap justify-evenly items-center gap-4 text-gray-700 dark:text-gray-100">
      <NuxtLink
        v-for="link of navigation"
        :key="link._path"
        :to="link._path"
        class="nav-item hover:text-primary-400 transition-all duration-300 text-center"
        :class="{
          'font-bold text-primary-400':
            route.path === link._path || (route.path.startsWith(link._path) && link._path !== '/'),
        }"
      >
        <div>{{ link.title }}</div>
        <div class="h-0 font-bold invisible">{{ link.title }}</div>
      </NuxtLink>
    </div>
    <!-- Social icons & Color mode -->
    <div class="flex-shrink-0 space-x-3 transition dark:text-gray-100">
      <a href="https://github.com/steffbeckers" title="GitHub" class="hover:text-primary-400">
        <Icon name="fa-brands:github" class="w-5 h-5" />
      </a>
      <ColorModeSwitch class="hover:text-primary-400" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.nav-item {
  transition: color 0.2s ease;
  transition: font-weight 0.2s ease;
}
</style>
