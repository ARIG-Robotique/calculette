<template>
  <v-toolbar density="compact">
    <div class="d-flex ga-2 ml-2">
      <v-chip variant="outlined">
        {{ t('form.actions') }}: {{ data.subtotal }}
      </v-chip>
      <v-chip variant="outlined">
        {{ t('form.bonus') }}: {{ data.bonus }}
      </v-chip>
      <v-chip variant="outlined">
        {{ t('form.sima') }}: {{ data.sima }}
      </v-chip>
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
          cols="12"
          md="6"
          lg="4"
        >
          <InputNumber
            v-model="form.tribune1"
            :max="18"
            :label="t('action1')"
            :help="t('help1')"
          />
          <InputNumber
            v-model="form.tribune2"
            :max="form.tribune1"
            :label="t('action2')"
            :help="t('help2')"
          />
          <InputNumber
            v-model="form.tribune3"
            :max="form.tribune2"
            :label="t('action3')"
            :help="t('help3')"
          />
          <InputCheckbox
            v-model="form.banner"
            :label="t('action4')"
            :help="t('help4')"
          />
          <InputCheckbox
            v-model="form.backstage"
            :label="t('action9')"
            :help="t('help9')"
          />
          <InputEstimation
            v-model="form.estimation"
            help="Bonus = Min(20 - (|Score - Estimation| / 2), Score)"
            @set-estimation="data.setEstimation()"
          />
          <InputNumber
            v-model="form.areasWGroupies"
            :max="3"
            :label="t('action5')"
            :help="t('help5')"
          />
          <InputCheckbox
            v-model="form.superstar"
            :label="t('action6')"
            :help="t('help6')"
          />
          <InputNumber
            v-model="form.freeStageArea"
            :max="6"
            :label="t('action8')"
            :help="t('help8')"
          />
          <InputCheckbox
            v-model="form.allSima"
            :label="t('action7')"
            :help="t('help7')"
          />
          <InputCheckbox
            v-model="form.nonForfait"
            :label="t('action10')"
            :help="t('help10')"
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
import InputEstimation from '@/components/InputEstimation.vue';
import InputNumber from '@/components/InputNumber.vue';
import { Data2025, Messages2025 } from '@/data/Data2025';
import { useCdrData } from '@/providers/useCdrData';
import { useI18n } from 'vue-i18n';

const YEAR = '2025';

const { t } = useI18n({ messages: Messages2025 });
const data = useCdrData(Data2025);
const { form } = data;
</script>
