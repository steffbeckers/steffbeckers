<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();

definePageMeta({
  layout: "none",
  title: "CV",
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
        <div class="flex" style="gap: 8mm">
          <aside class="w-1/3 flex flex-col gap-6">
            <a href="https://steffbeckers.eu">
              <section class="logo flex gap-4 items-center">
                <img
                  class="rounded-full shadow-md"
                  src="/images/steff.jpg"
                  width="72"
                  height="72"
                />
                <div class="flex flex-col text-3xl leading-none">
                  <div class="text-4xl font-bold">
                    <div class="flex justify-between">
                      <div>S</div>
                      <div>T</div>
                      <div>E</div>
                      <div>F</div>
                      <div>F</div>
                    </div>
                  </div>
                  <div>BECKERS</div>
                </div>
              </section>
            </a>
            <section class="get-in-touch flex flex-col gap-2">
              <header>
                <a href="https://steffbeckers.eu/contact">
                  <h2>{{ $t("GetInTouch") }}</h2>
                </a>
              </header>
              <div class="flex flex-col gap-3">
                <div class="personal-info flex flex-col gap-2">
                  <header>
                    <h3>{{ $t("PersonalInfo") }}</h3>
                  </header>
                  <div class="flex flex-col">
                    <h4 class="subtitle">{{ $t("Name") }}</h4>
                    <div class="text-sm">Steff Beckers</div>
                  </div>
                  <div class="relative flex flex-col">
                    <h4 class="subtitle">{{ $t("Address") }}</h4>
                    <a class="text-sm" href="https://goo.gl/maps/KyGduB3qTaBZVPR46">
                      3945 Tessenderlo-Ham<br />
                      {{ $t("Belgium") }}
                    </a>
                    <a href="https://goo.gl/maps/KyGduB3qTaBZVPR46">
                      <img
                        class="absolute"
                        style="top: 36px; right: 0px"
                        src="/cv/images/tessenderlo-ham.png"
                        width="80"
                      />
                    </a>
                  </div>
                  <div class="flex flex-col">
                    <h4 class="subtitle">{{ $t("Phone") }}</h4>
                    <a class="text-sm" href="tel:+32499765192">+32 499 765 192</a>
                  </div>
                  <div class="flex flex-col">
                    <h4 class="subtitle">{{ $t("Email") }}</h4>
                    <a class="text-sm" href="mailto:steff@steffbeckers.eu">steff@steffbeckers.eu</a>
                  </div>
                  <div class="flex flex-col">
                    <h4 class="subtitle">{{ $t("Website") }}</h4>
                    <a class="text-sm" href="https://steffbeckers.eu">steffbeckers.eu</a>
                  </div>
                </div>
                <div class="social-media flex flex-col gap-2">
                  <header>
                    <h3>{{ $t("SocialMedia") }}</h3>
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
              </div>
            </section>
            <section class="languages flex flex-col gap-2">
              <header>
                <h2>{{ $t("Languages") }}</h2>
              </header>
              <div class="flex justify-between">
                <div class="flex flex-col">
                  <h4 class="subtitle">{{ $t("Dutch") }}</h4>
                  <div class="text-sm">{{ $t("Native") }}</div>
                </div>
                <div class="flex flex-col">
                  <h4 class="subtitle">{{ $t("English") }}</h4>
                  <div class="text-sm">{{ $t("Fluent") }}</div>
                </div>
                <div class="flex flex-col">
                  <h4 class="subtitle">{{ $t("French") }}</h4>
                  <div class="text-sm">{{ $t("Basics") }}</div>
                </div>
              </div>
            </section>
            <section class="hobbies-and-interests flex flex-col gap-2">
              <header>
                <h2>{{ $t("HobbiesAndInterests") }}</h2>
              </header>
              <ul class="text-sm list-disc list-inside marker:text-primary-400">
                <li>{{ $t("OwnDevelopmentProjects") }}</li>
                <li>{{ $t("LearningNewTechnologies") }}</li>
                <li>{{ $t("MemberOfSnookerClub") }}</li>
                <li>{{ $t("MultiplayerGames") }}</li>
                <li>{{ $t("ListeningToMusic") }}</li>
                <li>{{ $t("BrainTrainers") }}</li>
              </ul>
            </section>
          </aside>
          <main class="w-2/3 flex flex-col gap-6">
            <section class="intro">
              <header>
                <a href="https://steffbeckers.eu">
                  <h2>Hi! I'm Steff</h2>
                </a>
                <h4 class="subtitle">Full-stack .NET & Angular developer | DevOps enthusiast</h4>
              </header>
              <p>
                I'm a passionate developer with a strong focus on
                <strong>web development</strong> and <strong>DevOps</strong>. I thrive on learning
                and working with the <strong>latest technologies and frameworks</strong> to
                continuously grow my expertise.
              </p>
              <p>
                I enjoy collaborating as part of a team in an <strong>agile</strong> environment,
                where I can contribute to building impactful solutions. I'm detail-oriented,
                committed to <strong>getting things right</strong>, and understand that even the
                smallest details can make a big difference.
              </p>
            </section>
            <section class="work-experience flex flex-col gap-2">
              <header>
                <a href="https://steffbeckers.eu/experience">
                  <h2>Work experience</h2>
                </a>
                <h4 class="subtitle">Many lines of code and coffee</h4>
              </header>
              <div class="flex flex-col gap-2">
                <div>
                  <header class="flex items-center justify-between">
                    <div class="flex flex-col gap-1">
                      <a href="https://steffbeckers.eu/experience#software-developer-fuzed">
                        <h3>Software Developer @ Fuzed</h3>
                      </a>
                      <h4>Nov 2023 - Present</h4>
                    </div>
                    <a href="https://fuzed.app">
                      <img src="/images/logos/fuzed-logo-black.svg" width="90" />
                    </a>
                  </header>
                  <p>
                    At <strong>Fuzed</strong> (previously known as <strong>Codefined</strong>), I
                    contribute in developing an innovative, <strong>cloud-based ERP</strong> system
                    tailored for the <strong>food production industry</strong>.
                  </p>
                </div>
                <div>
                  <header class="flex items-center justify-between">
                    <div class="flex flex-col gap-1">
                      <a href="https://steffbeckers.eu/experience#software-developer-codefined">
                        <h3>Software Developer @ Codefined</h3>
                      </a>
                      <h4>May 2021 - Oct 2023</h4>
                    </div>
                    <a href="https://codefined.be">
                      <img src="/images/logos/codefined-logo-black.svg" width="150" />
                    </a>
                  </header>
                  <p>
                    At <strong>Codefined</strong>, I specialized in developing custom
                    <strong>.NET</strong> and <strong>Angular</strong>
                    web applications tailored to meet client-specific requirements.
                  </p>
                </div>
                <div>
                  <header class="flex items-center justify-between">
                    <div class="flex flex-col gap-1">
                      <a href="https://steffbeckers.eu/experience#analyst-developer-aarixa">
                        <h3>Analyst Developer @ aariXa</h3>
                      </a>
                      <h4>July 2017 - April 2021</h4>
                    </div>
                    <a href="https://www.aarixa.be">
                      <img src="/images/logos/aarixa-logo-blue.png" width="80" />
                    </a>
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
                  <header class="flex items-center justify-between">
                    <div class="flex flex-col gap-1">
                      <a
                        href="https://steffbeckers.eu/experience#dynamics-365-crm-developer-bridgestone"
                      >
                        <h3>Dynamics 365 CRM Developer @ Bridgestone</h3>
                      </a>
                      <h4>October 2016 - June 2017</h4>
                    </div>
                    <div class="flex gap-2 items-center">
                      <a href="https://be.ctg.com/">
                        <img src="/images/logos/ctg-logo.gif" width="30" />
                      </a>
                      <a href="https://www.bridgestone.eu/">
                        <img src="/images/logos/bridgestone-mark-black.png" width="30" />
                      </a>
                    </div>
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
                <a href="https://steffbeckers.eu/experience">
                  <h2>Education</h2>
                </a>
                <h4 class="subtitle">Hours of learning new technologies</h4>
              </header>
              <div class="flex flex-col gap-2">
                <div>
                  <header class="flex items-center justify-between">
                    <div class="flex flex-col gap-1">
                      <a
                        href="https://steffbeckers.eu/experience#professional-bachelors-degree-in-applied-computer-science"
                      >
                        <h3>
                          Professional Bachelor's Degree in Applied Computer Science @ Hogeschool
                          PXL
                        </h3>
                      </a>
                      <h4>September 2013 - June 2016</h4>
                    </div>
                    <a href="https://www.pxl.be/digital">
                      <img src="/images/logos/pxl-it-logo-black.png" width="90" />
                    </a>
                  </header>
                  <p>Application Development (Web & Mobile)</p>
                </div>
              </div>
            </section>
          </main>
        </div>
        <footer class="text-sm text-center">
          Last updated on <strong>{{ formatDate(runtimeConfig.public.lastUpdatedOn) }}</strong
          >. For more information and
          <a href="https://steffbeckers.eu/downloads/CV_Steff_Beckers.pdf"
            ><strong>latest version</strong></a
          >, visit my website:
          <a href="https://steffbeckers.eu"><strong>steffbeckers.eu</strong></a>
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
    @apply font-bold text-3xl;
  }

  h2 {
    @apply font-bold text-xl;
  }

  h3 {
    @apply font-bold leading-snug;
  }

  h4 {
    @apply font-medium text-xs;

    &.subtitle {
      @apply font-semibold font-mono text-primary-400;
    }
  }

  strong {
    @apply font-semibold;
  }
}
</style>
