<template>
  <ContestToolbar
    :year="YEAR"
    :data="data"
  >
    <v-chip
      color="accent"
      variant="elevated"
    >
      {{ t('form.total') }}: {{ data.total }}
    </v-chip>
  </ContestToolbar>

  <form>
    <v-container fluid>
      <v-row justify="center">
        <v-col
          class="scoring-inputs"
          cols="12"
          md="6"
          lg="4"
        >
          <InputSlider
            v-model="form.stoneInZone"
            :min="stonesUsed"
            :max="30"
            :label="t('action1')"
            :help="t('help1')"
          />
          <InputRadio
            v-model="form.wall"
            :max="5"
            :max-selectable="maxWalls"
            :label="t('action2')"
            :help="t('help2')"
          />
          <InputRadio
            v-model="form.tower"
            :max="4"
            :max-selectable="maxTowers"
            :label="t('action3')"
            :help="t('help3')"
          />
          <InputCheckbox
            v-model="form.door"
            :disabled="!form.door && stonesAvailable < 3"
            :label="t('action4')"
            :help="t('help4')"
          />
          <InputCheckbox
            v-model="form.grailPresent"
            :label="t('action5')"
            :help="t('help5')"
          />
          <InputRadio
            v-model="form.grailLevel"
            :max="4"
            :label="t('action6')"
            :help="t('help6')"
          />
          <InputCheckbox
            v-model="form.arrival"
            :label="t('action7')"
            :help="t('help7')"
          />
          <InputCheckbox
            v-model="form.fullArrival"
            :label="t('action8')"
            :help="t('help8')"
          />
          <InputRadio
            v-model="form.moat"
            :max="3"
            :label="t('action9')"
            :help="t('help9')"
          />
          <InputCheckbox
            v-model="form.attack"
            :label="t('action10')"
            :help="t('help10')"
          />
          <InputCheckbox
            v-model="form.cannonball"
            :label="t('action11')"
            :help="t('help11')"
          />
          <InputCheckbox
            v-model="form.cannonballx3"
            :label="t('action12')"
            :help="t('help12')"
          />
          <BtnReset @reset="data.reset()" />
        </v-col>
        <v-col class="d-none d-lg-block">
          <EmbedPdf :year="YEAR" />
        </v-col>
      </v-row>
    </v-container>
  </form>
</template>

<script setup lang="ts">
import BtnReset from '@/components/BtnReset.vue';
import ContestToolbar from '@/components/ContestToolbar.vue';
import EmbedPdf from '@/components/EmbedPdf.vue';
import InputCheckbox from '@/components/InputCheckbox.vue';
import InputRadio from '@/components/InputRadio.vue';
import InputSlider from '@/components/InputSlider.vue';
import { Data2027, Messages2027 } from '@/data/Data2027';
import { useCdrData } from '@/providers/useCdrData';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const YEAR = '2027';

const { t } = useI18n({ messages: Messages2027 });
const data = useCdrData(Data2027);
const { form } = data;

const stonesUsed = computed(() => form.wall * 3 + form.tower + (form.door ? 3 : 0));
const stonesAvailable = computed(() => form.stoneInZone - stonesUsed.value);
const maxWalls = computed(() => Math.floor((stonesAvailable.value + form.wall * 3) / 3));
const maxTowers = computed(() => stonesAvailable.value + form.tower);

watch(() => form.fullArrival, (fullArrival) => {
  if (fullArrival) {
    form.arrival = true;
  }
});

watch(() => form.arrival, (arrival) => {
  if (!arrival) {
    form.fullArrival = false;
  }
});

watch(() => form.cannonballx3, (cannonballx3) => {
  if (cannonballx3) {
    form.cannonball = true;
  }
});

watch(() => form.cannonball, (cannonball) => {
  if (!cannonball) {
    form.cannonballx3 = false;
  }
});

watch(() => form.grailLevel, (grailLevel) => {
  if (grailLevel > 0) {
    form.grailPresent = true;
  }
})

watch(() => form.grailPresent, (grailPresent) => {
  if (!grailPresent) {
    form.grailLevel = 0;
  }
})
</script>

<style scoped>
.scoring-inputs :deep(.v-switch) {
  height: 54px;
}
</style>
