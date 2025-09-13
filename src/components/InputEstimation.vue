<template>
  <InputNumber
    v-model="value"
    :label="t('form.estimation')"
    :help="help"
  >
    <template #append>
      <v-btn
        icon="mdi-import"
        color="accent"
        variant="tonal"
        density="compact"
        @click="emit('setEstimation')"
      />
    </template>
  </InputNumber>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import InputNumber from './InputNumber.vue';

const { t } = useI18n();

const value = defineModel<number>({ required: true });

const emit = defineEmits<{
    setEstimation: [void],
}>();

defineProps<{
    help: string;
}>();
</script>
