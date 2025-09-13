<template>
  <v-toolbar density="compact">
    <div class="d-flex ga-2 ml-2">
      <v-chip
        color="accent"
        variant="elevated"
      >
        {{ t('form.total') }}: {{ data.total }}
      </v-chip>
    </div>

    <template #append>
      <BtnShare
        :year="YEAR"
        :value="data.serializedForm"
      />
      <BtnFavorites
        :year="YEAR"
        :total="data.total"
        :form="form"
        @apply="data.applyFavorite($event)"
      />
    </template>
  </v-toolbar>

  <form>
    <v-container fluid>
      <v-row justify="center">
        <v-col
          cols="7"
          md="4"
          lg="3"
        >
          <InputNumber
            v-model="form.nid"
            :max="6"
            :label="t('action1')"
            :help="t('help1')"
          />
          <InputNumber
            v-model="form.gardeManger"
            :max="48"
            :label="t('action2')"
            :help="t('help2')"
          />
          <InputNumber
            v-model="form.interressement"
            :max="10"
            :label="t('action3')"
            :help="t('help3')"
          />
          <InputNumber
            v-model="form.frigoVide"
            :max="4"
            :label="t('action4')"
            :help="t('help4')"
          />
          <InputNumber
            v-model="form.frigoPourrie"
            :max="4"
            :label="t('action5')"
            :help="t('help5')"
          />
          <InputNumber
            v-model="form.thermometre"
            :max="10"
            :label="t('action6')"
            :help="t('help6')"
          />
          <InputCheckbox
            v-model="form.nidPartiel"
            :label="t('action7')"
            :help="t('help7')"
          />
          <InputCheckbox
            v-model="form.nidComplet"
            :label="t('action8')"
            :help="t('help8')"
          />
          <InputNumber
            v-model="form.gardeMangerOccupe"
            :max="7"
            :label="t('action9')"
            :help="t('help9')"
          />
          <InputCheckbox
            v-model="form.tousLesEcureuilMange"
            :label="t('action10')"
            :help="t('help10')"
          />
          <InputCheckbox
            v-model="form.nonForfait"
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
          <div style="height: 70px;" />
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
import BtnFavorites from '@/components/BtnFavorites.vue';
import BtnReset from '@/components/BtnReset.vue';
import BtnShare from '@/components/BtnShare.vue';
import EmbedPdf from '@/components/EmbedPdf.vue';
import InputCheckbox from '@/components/InputCheckbox.vue';
import InputNumber from '@/components/InputNumber.vue';
import { Data2026, Messages2026 } from '@/data/Data2026';
import { useCdrData } from '@/providers/useCdrData';
import { useI18n } from 'vue-i18n';

const YEAR = '2026';

const { t } = useI18n({ messages: Messages2026 });
const data = useCdrData(Data2026);
const { form } = data;
</script>
