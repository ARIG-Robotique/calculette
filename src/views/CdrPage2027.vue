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
          cols="7"
          md="4"
          lg="3"
        >
          <InputNumber
            v-model="form.stoneInZone"
            :max="30"
            :label="t('action1')"
            :help="t('help1')"
          />
          <InputNumber
            v-model="form.wall"
            :max="5"
            :label="t('action2')"
            :help="t('help2')"
          />
          <InputNumber
            v-model="form.tower"
            :max="4"
            :label="t('action3')"
            :help="t('help3')"
          />
          <InputCheckbox
            v-model="form.door"
            :label="t('action4')"
            :help="t('help4')"
          />
          <InputCheckbox
            v-model="form.grailPresent"
            :label="t('action5')"
            :help="t('help5')"
          />
          <InputNumber
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
          <InputNumber
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
          <InputNumber
            v-model="form.cannonball"
            :max="10"
            :label="t('action11')"
            :help="t('help11')"
          />
        </v-col>
        <v-col
          cols="5"
          md="3"
          lg="2"
        >
          <InputNumber
            v-model="form.p1"
            label="P1"
          />
          <InputNumber
            v-model="form.p2"
            label="P2"
          />
          <InputNumber
            v-model="form.p3"
            label="P3"
          />
          <InputNumber
            v-model="form.p4"
            label="P4"
          />
          <InputNumber
            v-model="form.p5"
            label="P5"
          />
          <InputNumber
            v-model="form.p6"
            label="P6"
          />
          <InputNumber
            v-model="form.p7"
            label="P7"
          />
          <InputNumber
            v-model="form.p8"
            label="P8"
          />
          <InputNumber
            v-model="form.p9"
            label="P9"
          />
          <InputNumber
            v-model="form.p10"
            label="P10"
          />
          <InputNumber
            v-model="form.p11"
            label="P11"
          />
          <BtnReset @reset="data.reset()" />
        </v-col>
      </v-row>
    </v-container>
  </form>
</template>

<script setup lang="ts">
import BtnReset from '@/components/BtnReset.vue';
import ContestToolbar from '@/components/ContestToolbar.vue';
import InputCheckbox from '@/components/InputCheckbox.vue';
import InputNumber from '@/components/InputNumber.vue';
import { Data2027, Messages2027 } from '@/data/Data2027';
import { useCdrData } from '@/providers/useCdrData';
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';

const YEAR = '2027';

const { t } = useI18n({ messages: Messages2027 });
const data = useCdrData(Data2027);
const { form } = data;

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
</script>
