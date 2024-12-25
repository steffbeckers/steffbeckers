<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();

definePageMeta({
  layout: "none",
});

useHead({
  htmlAttrs: {
    class: "cv",
  },
});

onMounted(() => {
  document.documentElement.classList.remove("dark");
});
</script>

<template>
  <NuxtLayout>
    <div class="page">
      <div class="flex flex-col h-full justify-between" style="gap: 6mm">
        <div class="flex" style="gap: 6mm">
          <aside class="w-1/3 flex flex-col gap-4">
            <section class="logo flex flex-col gap-4 items-center">
              <img class="rounded-full shadow-md w-3/5" src="/images/steff.jpg" />
              <h1>STEFF <span class="font-normal">BECKERS</span></h1>
            </section>
            <section class="get-in-touch flex flex-col gap-2">
              <header>
                <h2>Get in touch</h2>
              </header>
              <div class="flex flex-col gap-2">
                <header>
                  <h3>Personal info</h3>
                </header>
                <div class="flex flex-col">
                  <h4 class="subtitle">Name</h4>
                  <div class="text-sm">Steff Beckers</div>
                </div>
                <div class="flex flex-col">
                  <h4 class="subtitle">Phone</h4>
                  <a class="text-sm" href="tel:+32499765192">+32 499 765 192</a>
                </div>
                <div class="flex flex-col">
                  <h4 class="subtitle">Email</h4>
                  <a class="text-sm" href="mailto:steff@steffbeckers.eu">steff@steffbeckers.eu</a>
                </div>
                <div class="flex flex-col">
                  <h4 class="subtitle">Website</h4>
                  <a class="text-sm" href="https://steffbeckers.eu">steffbeckers.eu</a>
                </div>
                <div class="flex flex-col">
                  <h4 class="subtitle">Address</h4>
                  <a class="text-sm" href="https://goo.gl/maps/KyGduB3qTaBZVPR46">
                    3945 Tessenderlo-Ham <br />
                    Belgium
                  </a>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <header>
                  <h3>Social media</h3>
                </header>
                <a
                  class="flex gap-2 items-center"
                  href="https://linkedin.com/in/steffbeckers"
                  title="LinkedIn"
                >
                  <Icon name="fa-brands:linkedin" class="w-5 h-5" />
                  <div class="flex flex-col">
                    <h4 class="subtitle">LinkedIn</h4>
                    <div class="text-sm">linkedin.com/in/steffbeckers</div>
                  </div>
                </a>
                <a
                  class="flex gap-2 items-center"
                  href="https://github.com/steffbeckers"
                  title="GitHub"
                >
                  <Icon name="fa-brands:github" class="w-5 h-5" />
                  <div class="flex flex-col">
                    <h4 class="subtitle">GitHub</h4>
                    <div class="text-sm">github.com/steffbeckers</div>
                  </div>
                </a>
                <a
                  class="flex gap-2 items-center"
                  href="https://facebook.com/steffbeckers"
                  title="Facebook"
                >
                  <Icon name="fa-brands:facebook" class="w-5 h-5" />
                  <div class="flex flex-col">
                    <h4 class="subtitle">Facebook</h4>
                    <div class="text-sm">facebook.com/steffbeckers</div>
                  </div>
                </a>
                <a
                  class="flex gap-2 items-center"
                  href="https://wa.me/32499765192"
                  title="WhatsApp"
                >
                  <Icon name="fa-brands:whatsapp" class="w-5 h-5" />
                  <div class="flex flex-col">
                    <h4 class="subtitle">WhatsApp</h4>
                    <div class="text-sm">+32 499 765 192</div>
                  </div>
                </a>
              </div>
            </section>
          </aside>
          <main class="w-2/3 flex flex-col gap-4">
            <section class="intro">
              <header>
                <h2>Hi! I'm Steff</h2>
                <h4 class="subtitle">Full-stack .NET & Angular developer | DevOps enthusiast</h4>
              </header>
              <p>
                I'm a passionate developer with a strong focus on web development and DevOps. I
                thrive on learning and working with the latest technologies and frameworks to
                continuously grow my expertise.
              </p>
              <p>
                I enjoy collaborating as part of a team in an agile environment, where I can
                contribute to building impactful solutions. I'm detail-oriented, committed to
                getting things right, and understand that even the smallest details can make a big
                difference.
              </p>
            </section>
            <section class="work-experience flex flex-col gap-2">
              <header>
                <h2>Work experience</h2>
                <h4 class="subtitle">Many lines of code and coffee</h4>
              </header>
              <div class="flex flex-col gap-2">
                <div>
                  <header>
                    <h3>Software Developer @ Fuzed</h3>
                    <h4>Nov 2023 - Present</h4>
                  </header>
                  <p>
                    At <strong>Fuzed</strong> (previously known as <strong>Codefined</strong>), I
                    contribute in developing an innovative, <strong>cloud-based ERP</strong> system
                    tailored for the <strong>food production industry</strong>.
                  </p>
                </div>
                <div>
                  <header>
                    <h3>Software Developer @ Codefined</h3>
                    <h4>May 2021 - Oct 2023 (2 years, 6 months)</h4>
                  </header>
                  <p>
                    At <strong>Codefined</strong>, I specialized in developing custom
                    <strong>.NET</strong> and <strong>Angular</strong>
                    web applications tailored to meet client-specific requirements.
                  </p>
                </div>
                <div>
                  <header>
                    <h3>Analyst Developer @ aariXa</h3>
                    <h4>July 2017 - April 2021 (3 years, 10 months)</h4>
                  </header>
                  <p>
                    At <strong>aariXa</strong>, I worked extensively with a versatile tech stack,
                    including <strong>Angular</strong>, <strong>.NET</strong>,
                    <strong>MS SQL</strong>, <strong>Azure</strong>, and
                    <strong>Windows Server</strong>, combining modern frameworks and
                    <strong>Microsoft-centric technologies</strong> to deliver innovative solutions.
                  </p>
                </div>
                <div>
                  <header>
                    <h3>Dynamics 365 CRM Developer @ Bridgestone</h3>
                    <h4>October 2016 - June 2017 (9 months)</h4>
                  </header>
                  <p>
                    As a consultant at <strong>CTG</strong>, I contributed to a project for
                    <strong>Bridgestone</strong>, focusing on the customization and enhancement of
                    their <strong>Dynamics 365 CRM</strong> system.
                  </p>
                </div>
              </div>
            </section>
            <section class="education flex flex-col gap-2">
              <header>
                <h2>Education</h2>
                <h4 class="subtitle">Hours of learning new technologies</h4>
              </header>
              <div class="flex flex-col gap-2">
                <div>
                  <h3>
                    Professional Bachelor's Degree in Applied Computer Science @ Hogeschool PXL
                  </h3>
                  <h4>September 2013 - June 2016 (2 years, 10 months)</h4>
                  <p>Application Development (Web & Mobile)</p>
                </div>
              </div>
            </section>
          </main>
        </div>
        <footer class="text-sm text-center">
          Last updated on <strong>{{ formatDate(runtimeConfig.public.lastUpdatedOn) }}</strong
          >. For more information and <strong>latest version</strong>, visit my website:
          <strong>steffbeckers.eu</strong>
        </footer>
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="postcss" scoped>
html.cv {
  &,
  body,
  #__nuxt {
    width: 210mm;
    height: 297mm;
  }

  body {
    overflow-y: auto;
  }

  .page {
    width: 210mm;
    height: 297mm;
    background-color: white;
    padding: 12mm;
  }

  p {
    @apply text-sm my-2;
  }

  h1 {
    @apply font-bold text-2xl;
  }

  h2 {
    @apply font-bold text-xl;
  }

  h3 {
    @apply font-bold leading-snug;
  }

  h4 {
    @apply font-semibold text-xs;

    &.subtitle {
      @apply font-mono text-primary-400;
    }
  }

  /* TODO: Remove */
  aside {
    border: 1px solid red;
  }

  /* TODO: Remove */
  main {
    border: 1px solid blue;
  }

  footer {
    /* TODO: Remove */
    border: 1px solid green;
  }
}
</style>
