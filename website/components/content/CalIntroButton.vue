<script setup>
onMounted(() => {
  (function (C, A, L) {
    let p = function (a, ar) {
      a.q.push(ar);
    };
    let d = C.document;
    C.Cal =
      C.Cal ||
      function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () {
            p(api, arguments);
          };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
  })(window, "https://app.cal.com/embed/embed.js", "init");
  Cal("init", "intro-meeting", { origin: "https://cal.com" });

  Cal.ns["intro-meeting"]("ui", {
    cssVarsPerTheme: { light: { "cal-brand": "#292929" }, dark: { "cal-brand": "#34d399" } },
    hideEventTypeDetails: false,
    layout: "month_view",
  });
});
</script>

<template>
  <ButtonLink
    class="cursor-pointer"
    data-cal-link="steffbeckers/intro-meeting"
    data-cal-namespace="intro-meeting"
    data-cal-config='{"layout":"month_view"}'
    icon="fa6-regular:calendar-days"
  >
    {{ $t("BookAnIntroMeeting") }}
  </ButtonLink>
</template>
