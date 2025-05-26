<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const { fallbackLocale, locale } = useI18n();
const localePath = useLocalePath();

const localePrefix = locale.value !== fallbackLocale.value ? "/" + locale.value : "";
let siteUrl = runtimeConfig.public.siteUrl;

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
            <a :href="siteUrl + localePath('index')">
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
                <a :href="siteUrl + localePath('contact')">
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
                    <a class="text-sm" href="tel:+32499765192">+32 499 76 51 92</a>
                  </div>
                  <div class="flex flex-col">
                    <h4 class="subtitle">{{ $t("Email") }}</h4>
                    <a class="text-sm" href="mailto:steff@steffbeckers.com"
                      >steff@steffbeckers.com</a
                    >
                  </div>
                  <div class="flex flex-col">
                    <h4 class="subtitle">{{ $t("Website") }}</h4>
                    <a class="text-sm" :href="siteUrl + localePath('index')">steffbeckers.com</a>
                  </div>
                </div>
                <div class="personal-info flex flex-col gap-2">
                  <header>
                    <h3>{{ $t("SelfEmployedSecondaryActivity") }}</h3>
                  </header>
                  <div class="flex flex-col">
                    <h4 class="subtitle">{{ $t("CompanyNumber") }}</h4>
                    <div class="text-sm">
                      <a
                        href="https://kbopub.economie.fgov.be/kbopub/zoeknummerform.html?lang=en&nummer=1017520397"
                        >1017.520.397</a
                      >
                    </div>
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
                      <div class="text-sm">+32 499 76 51 92</div>
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
                <li>
                  <a href="https://github.com/steffbeckers">{{ $t("OwnDevelopmentProjects") }}</a>
                </li>
                <li>
                  <a :href="siteUrl + localePath('tutoring')">
                    {{ $t("Tutoring") }}
                  </a>
                </li>
                <li>{{ $t("LearningNewTechnologies") }}</li>
                <li>
                  <a href="https://www.play-er.be">{{ $t("MemberOfSnookerClub") }}</a>
                </li>
                <li>{{ $t("MultiplayerGames") }}</li>
                <li>{{ $t("ListeningToMusic") }}</li>
                <li>{{ $t("BrainTrainers") }}</li>
              </ul>
            </section>
          </aside>
          <main class="w-2/3 flex flex-col gap-6">
            <section class="intro">
              <header>
                <a :href="siteUrl + localePath('index')">
                  <h2>{{ $t("HiImSteff") }}</h2>
                </a>
                <h4 class="subtitle">{{ $t("JobTitle") }}</h4>
              </header>
              <ContentDoc :path="localePrefix + '/cv/intro'" :head="false" />
            </section>
            <section class="work-experience flex flex-col gap-2">
              <header>
                <a :href="siteUrl + localePath('experience')">
                  <h2>{{ $t("WorkExperience") }}</h2>
                </a>
                <h4 class="subtitle">{{ $t("ManyLinesOfCodeAndCoffee") }}</h4>
              </header>
              <div class="flex flex-col gap-2">
                <div>
                  <header class="flex items-center justify-between">
                    <div class="flex flex-col gap-1">
                      <a :href="siteUrl + localePath('experience') + '#software-developer'">
                        <h3>Software Developer</h3>
                      </a>
                      <h4 class="text-gray-500">
                        Fuzed | {{ $t("November") }} 2023 - {{ $t("Present") }}
                      </h4>
                    </div>
                    <a href="https://fuzed.app">
                      <img src="/images/logos/fuzed-logo-black.svg" width="90" />
                    </a>
                  </header>
                  <ContentDoc :path="localePrefix + '/cv/experience/fuzed'" :head="false" />
                </div>
                <div>
                  <header class="flex items-center justify-between">
                    <div class="flex flex-col gap-1">
                      <!-- TODO: software-developer-1 -->
                      <a :href="siteUrl + localePath('experience') + '#software-developer-1'">
                        <h3>Software Developer</h3>
                      </a>
                      <h4 class="text-gray-500">
                        Codefined | {{ $t("May") }} 2021 - {{ $t("October") }} 2023
                      </h4>
                    </div>
                    <a href="https://codefined.be">
                      <img src="/images/logos/codefined-logo-black.svg" width="150" />
                    </a>
                  </header>
                  <ContentDoc :path="localePrefix + '/cv/experience/codefined'" :head="false" />
                </div>
                <div>
                  <header class="flex items-center justify-between">
                    <div class="flex flex-col gap-1">
                      <a :href="siteUrl + localePath('experience') + '#analyst-developer'">
                        <h3>Analyst Developer</h3>
                      </a>
                      <h4 class="text-gray-500">
                        aariXa | {{ $t("July") }} 2017 - {{ $t("April") }} 2021
                      </h4>
                    </div>
                    <a href="https://www.aarixa.be">
                      <img src="/images/logos/aarixa-logo-blue.png" width="80" />
                    </a>
                  </header>
                  <ContentDoc :path="localePrefix + '/cv/experience/aarixa'" :head="false" />
                </div>
                <div>
                  <header class="flex items-center justify-between">
                    <div class="flex flex-col gap-1">
                      <a :href="siteUrl + localePath('experience') + '#dynamics-365-crm-developer'">
                        <h3>Dynamics 365 CRM Developer</h3>
                      </a>
                      <h4 class="text-gray-500">
                        Bridgestone | {{ $t("October") }} 2016 - {{ $t("June") }} 2017
                      </h4>
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
                  <ContentDoc :path="localePrefix + '/cv/experience/bridgestone'" :head="false" />
                </div>
              </div>
            </section>
            <section class="education flex flex-col gap-2">
              <header>
                <a :href="siteUrl + localePath('experience')">
                  <h2>{{ $t("Education") }}</h2>
                </a>
                <h4 class="subtitle">{{ $t("HoursOfLearningNewTechnologies") }}</h4>
              </header>
              <div class="flex flex-col gap-2">
                <div>
                  <header class="flex items-center justify-between">
                    <div class="flex flex-col gap-1">
                      <!-- TODO: localized hashtag? -->
                      <a
                        :href="
                          siteUrl +
                          localePath('experience') +
                          '#professional-bachelors-degree-in-applied-computer-science'
                        "
                      >
                        <h3>{{ $t("ProfessionalBachelorsDegreeInAppliedComputerScience") }}</h3>
                      </a>
                      <h4 class="text-gray-500">
                        {{ $t("HogeschoolPXL") }} | {{ $t("September") }} 2013 -
                        {{ $t("June") }} 2016
                      </h4>
                    </div>
                    <a href="https://www.pxl.be/digital">
                      <img src="/images/logos/pxl-it-logo-black.png" width="90" />
                    </a>
                  </header>
                  <p>{{ $t("ApplicationDevelopmentWebAndMobile") }}</p>
                </div>
              </div>
            </section>
          </main>
        </div>
        <footer class="text-sm text-center">
          {{ $t("LastUpdatedOn") }}
          <strong>{{ formatDate(runtimeConfig.public.lastUpdatedOn, locale + "-BE") }}</strong
          >. {{ $t("ForMoreInformationAnd") }}
          <a
            :href="
              'https://steffbeckers.com/downloads/CV_Steff_Beckers' +
              (fallbackLocale != locale ? '_' + locale.toUpperCase() : '') +
              '.pdf'
            "
            ><strong>{{ $t("LatestVersion").toLowerCase() }}</strong></a
          >,<br />{{ $t("VisitMyWebsite").toLowerCase() }}:
          <a href="https://steffbeckers.com"><strong>steffbeckers.com</strong></a>
        </footer>
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="postcss">
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
