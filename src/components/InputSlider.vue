<template>
  <v-input
    class="mb-2"
    hide-details
    :prepend-icon="help ? 'mdi-information' : void 0"
    @click:prepend="snackbar.show(help!)"
  >
    <div class="input-slider__content">
      <div class="d-flex align-center ga-2 mb-2">
        <v-label
          class="opacity-100"
          :text="label"
        />
        <v-chip
          color="accent"
          variant="tonal"
          aria-live="polite"
        >
          {{ value }}
        </v-chip>
      </div>
      <v-slider
        v-model="value"
        :min="min"
        :max="max"
        :step="1"
        :aria-label="label"
        color="accent"
        hide-details
      >
        <template #prepend>
          <v-btn
            icon="mdi-minus"
            color="accent"
            variant="tonal"
            size="small"
            :aria-label="`${label} - 1`"
            :disabled="value <= min"
            @click="value = Math.max(min, value - 1)"
          />
        </template>
        <template #append>
          <v-btn
            icon="mdi-plus"
            color="accent"
            variant="tonal"
            size="small"
            :aria-label="`${label} + 1`"
            :disabled="value >= max"
            @click="value = Math.min(max, value + 1)"
          />
        </template>
      </v-slider>
    </div>
  </v-input>
</template>

<script setup lang="ts">
import { useAppCdrCtrl } from '@/providers/useAppCdr';

const value = defineModel<number>({ required: true });

withDefaults(defineProps<{
  min?: number;
  max: number;
  label: string;
  help?: string;
}>(), {
  min: 0,
  help: undefined,
});

const { snackbar } = useAppCdrCtrl();
</script>

<style scoped>
.input-slider__content {
  min-width: 0;
  width: 100%;
}
</style>
