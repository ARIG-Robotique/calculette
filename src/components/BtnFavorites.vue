<template>
  <v-btn
    icon
    :color="color"
    @click="show()"
  >
    <v-icon icon="mdi-star" />
    <v-tooltip
      activator="parent"
      location="top"
    >
      {{ t('favorites.title') }}
    </v-tooltip>
  </v-btn>
</template>

<script setup lang="ts">
import { type Favorite } from '@/models/Favorite';
import { useAppCdrCtrl } from '@/providers/useAppCdr';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { favorites } = useAppCdrCtrl();

const props = defineProps<{
  color?: string;
  year: string,
  total: number,
  form: Favorite['form'],
}>();

function show() {
  favorites.show(props.year, props.total, props.form);
}
</script>
