<template>
  <v-btn
    icon
    :color="color"
    @click="show()"
  >
    <v-icon icon="mdi-file-document" />
    <v-tooltip
      activator="parent"
      location="top"
    >
      {{ t('global.rules') }}
    </v-tooltip>
  </v-btn>
</template>

<script setup lang="ts">
import { useAppCdrCtrl } from '@/providers/useAppCdr';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { rulesPdf } = useAppCdrCtrl();

const props = defineProps<{ 
  color?: string;
  year: string;
}>();

function show() {
    rulesPdf.show(props.year);
}
</script>