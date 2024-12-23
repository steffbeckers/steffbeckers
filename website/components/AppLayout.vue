<script setup lang="ts">
const { cover } = useAppConfig();
const { cookiesEnabledIds } = useCookieControl();
const { gtag } = useGtag();

if (cookiesEnabledIds.value?.includes("google-analytics")) {
  gtag("consent", "update", {
    ad_user_data: "granted",
    ad_personalization: "granted",
    ad_storage: "granted",
    analytics_storage: "granted",
  });
} else {
  gtag("consent", "update", {
    ad_user_data: "denied",
    ad_personalization: "denied",
    ad_storage: "denied",
    analytics_storage: "denied",
  });
}

// Reload page if Google Analytics is enabled or disabled
watch(
  () => cookiesEnabledIds.value,
  (current, previous) => {
    if (!previous?.includes("google-analytics") && current?.includes("google-analytics")) {
      window.location.reload();
    }
  },
  { deep: true }
);
</script>

<template>
  <Html lang="en" />
  <Meta property="og:image" :content="cover" />
  <NuxtLoadingIndicator />
  <AppNavbar />
  <slot />
  <AppFooter />
  <CookieControl>
    <template #bar>
      <h2>{{ $cookies.moduleOptions.localeTexts[$cookies.locale.value]?.bannerTitle }}</h2>
      <p class="pr-4">
        {{ $cookies.moduleOptions.localeTexts[$cookies.locale.value]?.bannerDescription }}
      </p>
    </template>
  </CookieControl>
</template>

<style lang="postcss">
body {
  @apply bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-100 overflow-y-scroll;
}

h2 {
  > a {
    font-weight: inherit !important;
  }
}
</style>
