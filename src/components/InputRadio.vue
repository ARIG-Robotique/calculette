<template>
  <v-input
    class="mb-2"
    hide-details
    role="group"
    :aria-label="label"
    :prepend-icon="help ? 'mdi-information' : void 0"
    @click:prepend="snackbar.show(help!)"
  >
    <div class="input-radio__content d-flex flex-column align-start ga-2">
      <v-label
        class="opacity-100"
        :text="label"
      />
      <v-btn-toggle
        v-model="value"
        class="input-radio__options"
        height="54"
        mandatory
        divided
        color="accent"
        variant="tonal"
        :aria-label="label"
      >
        <v-btn
          v-for="option in max + 1"
          :key="option - 1"
          :value="option - 1"
          :disabled="option - 1 > (maxSelectable ?? max)"
          class="flex-grow-1"
          min-width="36"
          size="small"
        >
          {{ option - 1 }}
        </v-btn>
      </v-btn-toggle>
    </div>
  </v-input>
</template>

<script setup lang="ts">
import { useAppCdrCtrl } from '@/providers/useAppCdr';

const value = defineModel<number>({ required: true });

defineProps<{
  max: number;
  maxSelectable?: number;
  label: string;
  help?: string;
}>();

const { snackbar } = useAppCdrCtrl();
</script>

<style scoped>
.input-radio__content {
  min-width: 0;
  width: 100%;
}

.input-radio__options {
  width: 100%;
}
</style>
