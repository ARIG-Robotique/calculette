<template>
  <v-toolbar density="compact">
    <div class="d-flex ga-2 ml-2">
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
          sm="6"
          lg="3"
        >
          <InputNumber
            v-model="form.atomesTableau"
            label="Atomes dans le tableau (1 pt)"
            help="1 point pour chaque atome standard présent dans le tableau périodique"
          />
          <InputNumber
            v-model="form.atomesTableauClasses"
            :max="form.atomesTableau"
            label="Atomes classés (5 pts)"
            help="5 points supplémentaires pour chaque atome standard correctement classé dans les cases du tableau"
          />
          <InputCheckbox
            v-model="form.goldeniumTableau"
            label="Goldenium dans le tableau (6 pts)"
            help="6 points pour l’atome de &quot;Goldenium&quot; s’il est placé dans n’importe quelle case du tableau périodique"
          />
          <InputNumber
            v-model="form.rediumBalance"
            label="Redium dans la balance (4 pts)"
            help="4 points par atome présent dans le plateau de la balance pour le &quot;Redium&quot;"
          />
          <InputNumber
            v-model="form.greeniumBalance"
            label="Greenium dans la balance (8 pts)"
            help="8 points par atome présent dans le plateau de la balance pour le &quot;Greenium&quot;"
          />
          <InputNumber
            v-model="form.blueiumBalance"
            label="Blueium dans la balance (12 pts)"
            help="12 points par atome présent dans le plateau de la balance pour le &quot;Blueium&quot;"
          />
          <InputCheckbox
            v-model="form.goldeniumBalance"
            label="Goldenium dans la balance (24 pts)"
            help="24 points pour le &quot;Goldenium&quot; présent dans le plateau de la balance"
          />
          <InputNumber
            v-model="form.atomesAccel"
            label="Atomes dans l'accélérateur (10 pts)"
            help="10 points pour chaque atome présent dans l’accélérateur de particules"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          lg="3"
        >
          <InputCheckbox
            v-model="form.detecteurOuvert"
            label="Détecteur déverrouillé (10 pts)"
            help="10 points supplémentaires lorsque le détecteur a été déverrouillé (le &quot;Goldenium&quot; à été révélé)"
          />
          <InputCheckbox
            v-model="form.goldeniumPris"
            label="Goldenium extrait (20 pts)"
            help="20 points supplémentaires si l’atome de &quot;Goldenium&quot; à été extrait du détecteur"
          />
          <InputCheckbox
            v-model="form.experiencePresente"
            label="Expérience présente (5 pts)"
            help="5 points pour avoir déposé l’expérience sur la zone d’expérience avant le début match"
          />
          <InputCheckbox
            v-model="form.experienceActivee"
            label="Expérience activée (15 pts)"
            help="15 points supplémentaires pour avoir activé l’expérience durant le match"
          />
          <InputCheckbox
            v-model="form.electron"
            label="Electron arrivé (20 pts)"
            help="20 points supplémentaires si l’électron à atteint l’atome d’oxygène avant la fin du match"
          />
          <InputEstimation
            v-model="form.estimation"
            help="Bonus = (0.3 x Score) - Abs(Score - Estimation)"
            @set-estimation="data.setEstimation()"
          />
          <InputCheckbox
            v-model="form.meilleureBalance"
            label="(finale) Meilleure balance (30 pts)"
            help="Lors des phases finales, un bonus de 30 points sera accordé à l’équipe qui a mis le plus de points"
          />
          <InputCheckbox
            v-model="form.nonForfait"
            label="Non forfait (10 pts)"
            help="10 points bonus sont attribués à toutes les équipes qui ne sont pas &quot;forfait&quot;"
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
import { Data2019 } from '@/data/Data2019';
import { useCdrData } from '@/providers/useCdrData';

const YEAR = '2019';

const data = useCdrData(Data2019);
const { form } = data;
</script>
