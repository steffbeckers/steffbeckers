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
  <NuxtLoadingIndicator color="rgb(52 211 153)" />
  <AppNavbar />
  <div
    class="max-w-4xl px-4 py-8 m-auto bg-white sm:px-8 sm:shadow dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700 md:rounded-lg"
  >
    <main
      class="max-w-none prose dark:prose-invert prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 hover:prose-a:text-primary-400 prose-a:font-normal prose-a:no-underline prose-headings:mt-0 prose-h1:mb-2 prose-h2:mb-2 prose-h4:mb-4 prose-p:mt-0 prose-hr:my-6"
    >
      <slot />
    </main>
  </div>
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

main.prose > div[data-content-id] > :last-child {
  margin-bottom: 0;
}
</style>
