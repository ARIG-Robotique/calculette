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
            v-model="form.boueesPort"
            label="Bouées au port (1 pt)"
            help="1 point par bouée valide dans le port"
          />
          <InputNumber
            v-model="form.boueesChenaux"
            :max="form.boueesPort"
            label="Bouées dans les chenaux (1 pt)"
            help="1 point supplémentaire par bouée valide sur la ligne de chenal de la même couleur"
          />
          <InputNumber
            v-model="form.boueesPaires"
            :max="form.boueesChenaux / 2"
            label="Paires de bouées (2 pts))"
            help="2 points par paires de bouées valides sur les lignes de chenaux d’un même port. Une paire valide est composée d’une bouée verte et d’une bouée rouge"
          />
          <InputNumber
            v-model="form.manchesAir"
            :max="2"
            label="Manches à air levées (5-15 pts)"
            help="5 points si une seule manche à air est relevée à la fin du match. 15 points si les deux manches à air sont relevées en fin de match"
          />
          <v-btn-toggle
            v-model="form.nbRobots"
            class="mb-2 w-100"
          >
            <v-btn
              :value="1"
              color="accent"
              class="w-50"
            >
              Un robot
            </v-btn>
            <v-btn
              :value="2"
              color="accent"
              class="w-50"
            >
              Deux robots
            </v-btn>
          </v-btn-toggle>
          <InputNumber
            v-model="form.bonPort"
            :max="form.nbRobots"
            :label="form.nbRobots === 1 ? 'Robot dans le bon mouillage (20 pts)' : 'Robots dans le bon mouillage (10 pts)'"
            :help="form.nbRobots === 1 ? '20 points si le robot est valide dans la zone de mouillage indiquée par la girouette' : '10 points par robot valide dans la zone de mouillage indiquée par la girouette'"
          />
          <InputNumber
            v-model="form.mauvaisPort"
            :max="form.nbRobots"
            :label="form.nbRobots === 1 ? 'Robot dans le mauvais mouillage (6 pts)' : 'Robots dans le mauvais mouillage (3 pts)'"
            :help="form.nbRobots === 1 ? '6 points si le robot est valide dans l’autre zone de mouillage' : '3 points par robot valide dans l’autre zone de mouillage'"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          lg="3"
        >
          <v-switch
            v-model="form.pharePresent"
            label="Phare présent (2 pts)"
            help="2 points pour avoir déposé le phare sur la zone zone rocheuse avant le début match"
          />
          <v-switch
            v-model="form.phareActive"
            label="Phare activé (3 pts)"
            help="3 points supplémentaires pour avoir activé le phare durant le match"
          />
          <v-switch
            v-model="form.phareDeploye"
            label="Phare déployé (10 pts)"
            help="10 points supplémentaires si le phare est correctement déployé et allumé avant la fin du match"
          />
          <v-switch
            v-model="form.pavillonHisse"
            label="Pavillon hissé (10 pts)"
            help="10 points si au moins un robot parvient à hisser ses pavillons"
          />
          <InputEstimation
            v-model="form.estimation"
            help="Bonus = (0.3 x Score) - Abs(Score - Estimation)"
            @set-estimation="data.setEstimation()"
          />
          <v-switch
            v-model="form.nonForfait"
            label="Non forfait (5 pt)"
            help="5 points bonus sont attribués à toutes les équipes qui ne sont pas &quot;forfait&quot;"
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
import InputEstimation from '@/components/InputEstimation.vue';
import InputNumber from '@/components/InputNumber.vue';
import { Data2021 } from '@/data/Data2021';
import { useCdrData } from '@/providers/useCdrData';

const YEAR = '2021';

const data = useCdrData(Data2021);
const { form } = data;
</script>
