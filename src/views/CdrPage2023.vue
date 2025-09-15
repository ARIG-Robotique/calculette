<template>
  <ContestToolbar
    :year="YEAR"
    :data="data"
  >
    <v-chip variant="outlined">
      Actions: {{ data.subtotal }}
    </v-chip>
    <v-chip variant="outlined">
      Bonus: {{ data.bonus }}
    </v-chip>
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
            v-model="form.etagesGateaux"
            label="Etages de gâteau (1 pt)"
            help="1 point par étage dans le gâteau"
          />
          <InputNumber
            v-model="form.gateauxComplets"
            label="Gâteaux complets (4 pts)"
            help="4 points supplémentaires si le gâteau respecte la recette légendaire"
          />
          <InputCheckbox
            v-model="form.panierPresent"
            label="Panier présent (5 pts)"
            help="5 points si l’équipe dépose un panier pendant le temps de préparation"
          />
          <InputNumber
            v-model="form.cerisesPanier"
            label="Cerises dans le panier (1 pt)"
            help="1 point par cerise dans le panier"
          />
          <InputCheckbox
            v-model="form.panierOk"
            label="Comptage panier (5 pts)"
            help="5 points supplémentaires si le comptage est juste et supérieur à 0"
          />
          <InputCheckbox
            v-model="form.retourOk"
            label="Les roues dans le plat (15 pts)"
            help="15 points si tous les robots de l’équipe sont dans leurs plats"
          />
          <InputCheckbox
            v-model="form.funnyAction"
            label="Funny action (5 pts)"
            help="5 points si la funny action est réalisée"
          />
          <InputEstimation
            v-model="form.estimation"
            help="Bonus = 20 - Abs(Score - Estimation)"
            @set-estimation="data.setEstimation()"
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
import { Data2023 } from '@/data/Data2023';
import { useCdrData } from '@/providers/useCdrData';

const YEAR = '2023';

const data = useCdrData(Data2023);
const { form } = data;
</script>
