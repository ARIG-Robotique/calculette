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
          sm="6"
          lg="3"
        >
          <InputNumber
            v-model="form.carresFouille"
            :max="4"
            label="Carrés de fouille basculés (5 pts)"
            help="5 points pour chaque carré de fouille basculé à la couleur de l’équipe. 5 points supplémentaires si au moins un carré de fouille est basculé"
          />
          <InputCheckbox
            v-model="form.carresFouilleOk"
            label="Aucun carré rouge"
            help="Le basculement du carré de fouille rouge d’une équipe entraîne l’invalidation de tout les carrés de fouilles de l’équipe"
          />
          <InputNumber
            v-model="form.echantillonsPris"
            :max="9"
            label="Echantillons pris (1 pt)"
            help="1 point pour chaque échantillon enlevé d’un distributeur du côté de l’équipe (incluant le distributeur partagé et l’abri de chantier)"
          />
          <InputNumber
            v-model="form.echantillonsCampement"
            :max="24"
            label="Echantillons au campement (1 pt)"
            help="1 point par échantillon dans le campement"
          />
          <InputNumber
            v-model="form.echantillonsCampementValides"
            :max="form.echantillonsCampement"
            label="Echantillons triés au campement (1 pt)"
            help="1 point supplémentaire par échantillon face trésor et trié dans le campement"
          />
          <InputNumber
            v-model="form.echantillonsGalerie"
            :max="24"
            label="Echantillons sur la galerie (3 pts)"
            help="3 points par échantillon sur la galerie"
          />
          <InputNumber
            v-model="form.echantillonsGalerieValides"
            :max="form.echantillonsGalerie"
            label="Echantillons triés sur la galerie (3 pts)"
            help="3 points supplémentaires par échantillon face trésor et trié dans sa période historique"
          />
          <InputNumber
            v-model="form.echantillonsAbri"
            :max="24"
            label="Echantillons dans l'abri (5 pts)"
            help="5 points par échantillon dans l’abri"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          lg="3"
        >
          <InputCheckbox
            v-model="form.statuettePresente"
            label="Statuette présente (2 pts)"
            help="2 points pour la dépose de la statuette sur le piédestal pendant le temps de préparation"
          />
          <InputCheckbox
            v-model="form.statuettePrise"
            label="Statuette prise (5 pts)"
            help="5 points si la statuette n’est plus présente en fin de match sur le piédestal"
          />
          <InputCheckbox
            v-model="form.repliquePosee"
            label="Réplique posée (10 pts)"
            help="10 points si la réplique est présente en fin de match sur le piédestal"
          />
          <InputCheckbox
            v-model="form.statuettePosee"
            label="Statuette posée dans la vitrine (15 pts)"
            help="15 points si la statuette est présente en fin de match dans la vitrine"
          />
          <InputCheckbox
            v-model="form.vitrinePresente"
            label="Vitrine présente (2 pts)"
            help="2 points si l’équipe dépose une vitrine pendant le temps de préparatione"
          />
          <InputCheckbox
            v-model="form.vitrineActivee"
            label="Vitrine activée (5 pts)"
            help="5 points supplémentaires si la vitrine est activée"
          />
          <InputCheckbox
            v-model="form.retourRobots"
            label="Tous les robots revenus (20 pts)"
            help="20 points si tous les robots de l’équipe sont dans le campement ou la zone de fouille"
          />
          <InputEstimation
            v-model="form.estimation"
            help="Bonus = (0.3 x Score) - Abs(Score - Estimation)"
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
import { Data2022 } from '@/data/Data2022';
import { useCdrData } from '@/providers/useCdrData';

const YEAR = '2022';

const data = useCdrData(Data2022);
const { form } = data;
</script>
