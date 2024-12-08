<script setup lang="ts">
const { navigation } = useContent();
const appConfig = useAppConfig();
</script>

<template>
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
    <div class="flex items-center gap-4 text-gray-700 dark:text-gray-200">
      <NuxtLink
        v-for="link of navigation"
        :key="link._path"
        :to="link._path"
        active-class="font-bold"
      >
        {{ link.title }}
      </NuxtLink>
    </div>
    <!-- Social icons & Color Mode -->
    <div class="space-x-3 transition text-gray-500">
      <a
        v-if="appConfig.socials?.github"
        :href="`https://github.com/${appConfig.socials?.github}`"
        title="GitHub"
        class="dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300"
        ><Icon name="fa-brands:github" class="w-5 h-5"
      /></a>
      <ColorModeSwitch class="dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300" />
    </div>
  </div>
</template>
