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
        v-model="sliderValue"
        class="input-slider__slider"
        :style="{ '--unavailable-width': `${max > 0 ? min / max * 100 : 0}%` }"
        :min="0"
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
import { computed } from 'vue';

const value = defineModel<number>({ required: true });

const props = withDefaults(defineProps<{
  min?: number;
  max: number;
  label: string;
  help?: string;
}>(), {
  min: 0,
  help: undefined,
});

const { snackbar } = useAppCdrCtrl();

const sliderValue = computed({
  get: () => value.value,
  set: (next: number) => {
    value.value = Math.max(props.min, Math.min(props.max, next));
  },
});
</script>

<style scoped>
.input-slider__content {
  min-width: 0;
  width: 100%;
}

.input-slider__slider :deep(.v-slider-track) {
  position: relative;
  isolation: isolate;
  z-index: 0;
}

.input-slider__slider :deep(.v-slider-track)::after {
  content: '';
  position: absolute;
  inset-inline-start: 0;
  top: 50%;
  width: var(--unavailable-width);
  height: calc(var(--v-slider-track-size) + 4px);
  transform: translateY(-50%);
  border-radius: inherit;
  background-color: rgb(var(--v-theme-surface-variant));
  pointer-events: none;
  z-index: 1;
}

.input-slider__slider :deep(.v-slider-thumb) {
  z-index: 1;
}
</style>
