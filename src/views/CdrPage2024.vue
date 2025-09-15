<template>
  <ContestToolbar
    :year="YEAR"
    :data="data"
    mobile-mode
  >
    <div class="flex-1-0-100 flex-sm-1-1-0 d-flex ga-2">
      <v-chip variant="outlined">
        Actions: {{ data.subtotal }}
      </v-chip>
      <v-chip variant="outlined">
        Bonus: {{ data.bonus }}
      </v-chip>
      <v-chip variant="outlined">
        Coccinelles: {{ data.sima }}
      </v-chip>
    </div>
    <v-chip
      color="accent"
      variant="elevated"
    >
      Total: {{ data.total }}
    </v-chip>
  </ContestToolbar>

  <form>
    <v-container fluid>
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
          lg="4"
        >
          <InputNumber
            v-model="form.plantes"
            InputNumber:max="36"
            label="Plantes valides (3 pts)"
            help="3 points par plante valide dans une zone adaptée"
          />
          <InputNumber
            v-model="form.plantesPots"
            InputNumber:max="form.plantes"
            label="Plantes en pots (1 pt)"
            help="1 point supplémentaire si la plante valide est dans un pot"
          />
          <InputNumber
            v-model="form.plantesJardiniere"
            InputNumber:max="form.plantes"
            label="Plantes dans une jardinière (1 pt)"
            help="1 point supplémentaire si la plante valide est dans une jardinière"
          />
          <InputNumber
            v-model="form.panneaux"
            InputNumber:max="9"
            label="Panneaux valides (5 pts)"
            help="5 points pour chaque panneau valide pour l’équipe"
          />
          <InputCheckbox
            v-model="form.retour"
            label="Robot dans l'aire de recharge (10 pts)"
            help="10 points si le robot de l’équipe est dans l’aire valide"
          />
          <InputEstimation
            v-model="form.estimation"
            help="Bonus = Min(20 - Écart / 2, Score)"
            @set-estimation="data.setEstimation()"
          />
          <InputNumber
            v-model="form.zonesCoccinelle"
            InputNumber:max="6"
            label="Zones avec coccinelle (5 pts)"
            help="5 points par zone de dépose de l’équipe occupée par au moins une coccinelle à la fin du match"
          />
          <InputNumber
            v-model="form.zonesContact"
            InputNumber:max="form.zonesCoccinelle"
            label="Coccinelles en contact (5 pts)"
            help="5 points supplémentaires par zone de dépose de l’équipe dans laquelle au moins une coccinelle est en contact avec une plante ou un pot contenant une plante"
          />
          <InputCheckbox
            v-model="form.nonForfait"
            label="Non forfait (1 pt)"
            help="1 point bonus est attribué à toutes les équipes qui ne sont pas &quot;forfait&quot;"
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
import InputEstimation from '@/components/InputEstimation.vue';
import InputNumber from '@/components/InputNumber.vue';
import { Data2024 } from '@/data/Data2024';
import { useCdrData } from '@/providers/useCdrData';

const YEAR = '2024';

const data = useCdrData(Data2024);
const { form } = data;
</script>
