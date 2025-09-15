<template>
  <v-switch
    v-model="value"
    :label="label"
    :prepend-icon="help ? 'mdi-information' : void 0"
    @click:prepend="snackbar.show(help!)"
  />
</template>

<script setup lang="ts">
import { useAppCdrCtrl } from '@/providers/useAppCdr';

const value = defineModel<boolean>({ required: true });

defineProps<{
  label: string;
  help?: string;
}>();

const { snackbar } = useAppCdrCtrl();
</script>

<style scoped>
.v-switch {
  height: 70px;
  align-items: center;
  display: flex;
}
</style>
