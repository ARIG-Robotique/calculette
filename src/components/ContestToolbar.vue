<template>
  <v-toolbar :height="height">
    <div class="d-flex flex-wrap ga-2 ml-2">
      <slot />
    </div>

    <template #append>
      <div class="d-none d-sm-block">
        <v-btn
          icon
          @click="showRulesPdf()"
        >
          <v-icon icon="mdi-file-document" />
          <v-tooltip
            activator="parent"
            location="top"
          >
            {{ t('global.rules') }}
          </v-tooltip>
        </v-btn>
        <v-btn
          icon
          @click="showShareLink()"
        >
          <v-icon icon="mdi-share" />
          <v-tooltip
            activator="parent"
            location="top"
          >
            {{ t('share.title') }}
          </v-tooltip>
        </v-btn>
        <v-btn
          icon
          @click="showFavorites()"
        >
          <v-icon icon="mdi-star" />
          <v-tooltip
            activator="parent"
            location="top"
          >
            {{ t('favorites.title') }}
          </v-tooltip>
        </v-btn>
      </div>

      <v-btn
        icon
        class="d-sm-none"
      >
        <v-icon icon="mdi-dots-vertical" />
        <v-menu
          activator="parent"
          location="bottom right"
        >
          <v-list>
            <v-list-item @click="showRulesPdf()">
              <v-icon icon="mdi-file-document" />
              {{ t('global.rules') }}
            </v-list-item>
            <v-list-item @click="showShareLink()">
              <v-icon icon="mdi-share" />
              {{ t('share.title') }}
            </v-list-item>
            <v-list-item @click="showFavorites()">
              <v-icon icon="mdi-star" />
              {{ t('favorites.title') }}
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </template>
  </v-toolbar>
</template>

<script setup lang="ts">
import type { CdrController } from '@/providers/useCdrData';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';
import { useAppCdrCtrl } from '../providers/useAppCdr';

const { t } = useI18n();
const { xs } = useDisplay();
const { rulesPdf, shareLink, favorites } = useAppCdrCtrl();

const props = defineProps<{
  year: string,
  data: CdrController<any>,
  mobileMode?: boolean;
}>();

const height = computed(() => props.mobileMode && xs.value ? 92 : 48);

function showRulesPdf() {
  rulesPdf.show(props.year);
}

function showShareLink() {
  shareLink.show(props.year, props.data.serializedForm);
}

function showFavorites() {
  favorites.show(props.year, props.data.total, props.data.form);
}
</script>
