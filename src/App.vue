<template>
  <v-theme-provider>
    <v-app>
      <v-app-bar>
        <v-app-bar-nav-icon @click.stop="showMenu = !showMenu" />
        <v-app-bar-title>
          <div class="d-flex align-center ga-4">
            <img
              :src="'./img/logos/' + contest.year + '.png'"
              style="height: 40px"
            >
            {{ contest.year }} : {{ contest.name }}
          </div>
        </v-app-bar-title>
        <template #append>
          <v-btn
            v-if="contest.match"
            icon="mdi-flag-checkered"
            @click="switchMatch()"
          />
          <v-btn
            color="primary-text"
            icon
          >
            <v-icon icon="mdi-translate" />
            <v-menu
              activator="parent"
              location="bottom right"
            >
              <v-list>
                <v-list-item @click="setLocale('fr')">
                  🇫🇷 Français
                </v-list-item>
                <v-list-item @click="setLocale('en')">
                  🇬🇧 English
                </v-list-item>
              </v-list>
            </v-menu>
          </v-btn>
        </template>
      </v-app-bar>

      <v-navigation-drawer
        v-model="showMenu"
        temporary
        absolute
        width="400"
      >
        <v-toolbar>
          <v-app-bar-nav-icon @click.stop="showMenu = !showMenu" />
          <v-toolbar-title>{{ t('global.contests') }}</v-toolbar-title>
        </v-toolbar>
        <v-list>
          <v-list-item
            v-for="c in SORTED_CONTESTS"
            :key="c.year"
            :title="c.year + ': ' + c.name"
            :prepend-avatar="'./img/logos/' + c.year + '.png'"
            @click="setYear(c.year)"
          />
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <router-view />

        <AppSnackbar />
        <DialogFavorites />
        <DialogPdf />
        <DialogShare />

        <v-footer class="text-center d-block">
          Fait avec amour par
          <a
            href="https://arig-robotique.github.io/"
            class="text-accent"
          >ARIG Robotique</a><br>
          Contribuez sur
          <a
            href="https://github.com/ARIG-Robotique/calculette"
            class="text-accent"
          >GitHub</a><br>
          <img
            :src="'./img/logos/logo-arig.png'"
            style="width: 150px; margin: 1rem auto 0 auto;"
          >
        </v-footer>
      </v-main>
    </v-app>
  </v-theme-provider>
</template>

<script setup lang="ts">
import AppSnackbar from '@/components/AppSnackbar.vue';
import DialogFavorites from '@/components/DialogFavorites.vue';
import DialogPdf from '@/components/DialogPdf.vue';
import DialogShare from '@/components/DialogShare.vue';
import { C_QUERY_PARAM, THEME_PREFIX } from '@/data/constants';
import { CONTESTS } from '@/data/contests';
import { provideAppCdr } from '@/providers/useAppCdr';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useTheme } from 'vuetify';

const router = useRouter();
const route = useRoute();
const theme = useTheme();
const { locale, t } = useI18n();

provideAppCdr();

const SORTED_CONTESTS = Object.values(CONTESTS).sort((a, b) => b.year - a.year);

const contest = ref(SORTED_CONTESTS[0]);
const showMenu = ref(false);

watch(contest, (currentContest) => {
    theme.change(THEME_PREFIX + currentContest.year);
});

watch(theme.current, (currentTheme) => {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', currentTheme.colors.primary);
});

watch(locale, () => {
    document.title = t('appName');
});

watch(route, () => {
    const year = route.path.substring(1).split('/')[0];
    if (year) {
        contest.value = CONTESTS[year];
    }
});

function setYear(year: number) {
    router.push({ path: `/${year}`, query: { [C_QUERY_PARAM]: undefined } });
    showMenu.value = false;
}

function switchMatch() {
    const isMatch = route.path.substring(1).split('/')[1] === 'match';
    if (isMatch) {
        router.push({ path: `/${contest.value.year}`, query: { [C_QUERY_PARAM]: undefined } });
    } else {
        router.push({ path: `/${contest.value.year}/match`, query: { [C_QUERY_PARAM]: undefined } });
    }
}

function setLocale(newLocale: string) {
    locale.value = newLocale;
    showMenu.value = false;
    localStorage['locale'] = newLocale;
}
</script>

<style scoped>
.v-navigation-drawer {
    z-index: 1100 !important;
    top: 0 !important;
    height: 100% !important;
}

.v-toolbar-title {
  margin-inline-start: 0 !important;
}
</style>
