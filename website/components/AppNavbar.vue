<script setup lang="ts">
const { navigation } = useContent();
const route = await useRoute();
const { locale } = useI18n();
</script>

<template>
  <div class="flex items-center justify-between flex-wrap gap-4 max-w-4xl py-4 mx-auto px-4">
    <!-- Profile -->
    <NuxtLinkLocale class="flex-shrink-0" to="/">
      <Logo />
    </NuxtLinkLocale>
    <!-- Navigation -->
    <!-- TODO: Active link is not working anymore -->
    <div class="flex flex-wrap justify-evenly items-center gap-4 text-gray-700 dark:text-gray-100">
      <NuxtLinkLocale :to="{ path: '/' }" class="nav-item transition-all duration-300 text-center">
        <div>{{ $t("Home") }}</div>
        <div class="h-0 font-bold invisible">{{ $t("Home") }}</div>
      </NuxtLinkLocale>
      <NuxtLinkLocale to="experience" class="nav-item transition-all duration-300 text-center">
        <div>{{ $t("Experience") }}</div>
        <div class="h-0 font-bold invisible">{{ $t("Experience") }}</div>
      </NuxtLinkLocale>
      <NuxtLinkLocale to="blog" class="nav-item transition-all duration-300 text-center">
        <div>{{ $t("Blog") }}</div>
        <div class="h-0 font-bold invisible">{{ $t("Blog") }}</div>
      </NuxtLinkLocale>
      <NuxtLinkLocale to="tutoring" class="nav-item transition-all duration-300 text-center">
        <div>{{ $t("Tutoring") }}</div>
        <div class="h-0 font-bold invisible">{{ $t("Tutoring") }}</div>
      </NuxtLinkLocale>
      <NuxtLinkLocale to="contact" class="nav-item transition-all duration-300 text-center">
        <div>{{ $t("Contact") }}</div>
        <div class="h-0 font-bold invisible">{{ $t("Contact") }}</div>
      </NuxtLinkLocale>
    </div>
    <!-- Social icons & Color mode -->
    <div class="flex flex-shrink-0 gap-3 transition dark:text-gray-100">
      <a href="https://github.com/steffbeckers" title="GitHub" class="hover:text-primary-400">
        <Icon name="fa-brands:github" class="w-5 h-5" />
      </a>
      <ColorModeSwitch class="hover:text-primary-400" />
      <SwitchLocalePathLink v-if="locale === 'nl'" class="hover:text-primary-400" locale="en"
        >EN</SwitchLocalePathLink
      >
      <SwitchLocalePathLink v-if="locale === 'en'" class="hover:text-primary-400" locale="nl"
        >NL</SwitchLocalePathLink
      >
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.nav-item {
  transition: color 0.2s ease;
  transition: font-weight 0.2s ease;
}
</style>
