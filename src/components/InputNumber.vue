<template>
  <v-number-input
    v-model="value"
    :min="0"
    :max="max"
    :label="label"
    :prepend-icon="help ? 'mdi-information' : void 0"
    @click:prepend="snackbar.open(help!)"
  >
    <template #append>
      <slot name="append" />
    </template>    
  </v-number-input>
</template>

<script setup lang="ts">
import { useSnackbar } from '@/providers/useSnackbar';

const value = defineModel<number>({ required: true });

defineProps<{
    max?: number;
    label: string;
    help?: string;
}>();

const snackbar = useSnackbar();
</script>
