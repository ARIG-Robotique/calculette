<template>
  <v-dialog
    v-model="rulesPdf.isVisible.value"
    :fullscreen="true"
  >
    <v-card>
      <v-toolbar>
        <v-toolbar-title>{{ t('global.rules') }} {{ year }}</v-toolbar-title>
        <v-btn
          icon="mdi-close"
          @click="rulesPdf.hide()"
        />
      </v-toolbar>
      <embed
        v-if="pdfUrl"
        :src="pdfUrl + '#pagemode=bookmarks'"
        type="application/pdf"
        style="width: 100%; height: 100%; border: none;"
      >
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useAppCdrCtrl } from '@/providers/useAppCdr';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { CONTESTS } from '../data/contests';

const { locale, t } = useI18n();
const { rulesPdf } = useAppCdrCtrl();

const year = computed(() => rulesPdf.data.value.year);
const pdfUrl = computed(() => CONTESTS[rulesPdf.data.value.year].rulesPdf[locale.value]);
</script>