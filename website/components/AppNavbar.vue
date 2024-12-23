<script setup lang="ts">
const { navigation } = useContent();
const route = await useRoute();
</script>

<template>
  <!-- TODO: Responsive layout -->
  <div class="flex items-center justify-between gap-8 max-w-4xl py-4 mx-auto px-4">
    <!-- Profile -->
    <div class="flex gap-4 align-center">
      <div>
        <img class="rounded-full shadow-md" src="/images/steff.jpg" width="40" height="40" />
      </div>
      <div class="flex flex-col leading-none">
        <div class="font-bold" style="font-size: 1.4rem">STEFF</div>
        <div>BECKERS</div>
      </div>
    </div>
    <!-- Navigation -->
    <div class="flex items-center gap-4 text-gray-700 dark:text-gray-100">
      <!-- TODO: active-class is not working on /blog/* routes -->
      <NuxtLink
        v-for="link of navigation"
        :key="link._path"
        :to="link._path"
        class="nav-item hover:text-primary-400"
        :class="{
          'font-bold':
            route.path === link._path || (route.path.startsWith(link._path) && link._path !== '/'),
        }"
      >
        {{ link.title }}
      </NuxtLink>
    </div>
    <!-- Social icons & Color mode -->
    <div class="space-x-3 transition dark:text-gray-100">
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
