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
            v-model="form.etage1"
            label="Bâtiment étage 1 (1 pt)"
            help="1 point par cube valide dans la zone de construction pour le premier niveau (sol)"
          />
          <InputNumber
            v-model="form.etage2"
            label="Bâtiment étage 2 (2 pts)"
            help="2 points par cube valide dans la zone de construction pour le niveau 2"
          />
          <InputNumber
            v-model="form.etage3"
            label="Bâtiment étage 3 (3 pts)"
            help="3 points par cube valide dans la zone de construction pour le niveau 3"
          />
          <InputNumber
            v-model="form.etage4"
            label="Bâtiment étage 4 (4 pts)"
            help="4 points par cube valide dans la zone de construction pour le niveau 4"
          />
          <InputNumber
            v-model="form.etage5"
            label="Bâtiment étage 5 (5 pts)"
            help="5 points par cube valide dans la zone de construction pour le niveau 5"
          />
          <InputNumber
            v-model="form.combinaisons"
            label="Combinaisons correctes (30 pts)"
            help="30 points pour une combinaison de cubes correspondant au schéma de construction"
          />
          <InputNumber
            v-model="form.recuperateursVides"
            label="Récupérateurs vidés (10 pts)"
            help="10 points pour chaque récupérateur au moins vidé d’une balle par l’équipe à qui il appartient"
          />
          <InputNumber
            v-model="form.ballesChateau"
            label="Balles dans le chateau (5 pts)"
            help="5 points pour chaque balle de la bonne couleur dans le château d’eau"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          lg="3"
        >
          <InputCheckbox
            v-model="form.chateauOk"
            label="Aucune mauvaise balles"
            help="Une balle de la mauvaise couleur annule la totalité des points du château d’eau"
          />
          <InputNumber
            v-model="form.ballesStation"
            label="Balles dans la station (10 pts)"
            help="10 points par balle de la couleur adverse dans la station d’épuration"
          />
          <InputCheckbox
            v-model="form.panneauPresent"
            label="Panneau domotique présent (5 pts)"
            help="5 points pour la dépose du panneau devant le château d’eau"
          />
          <InputCheckbox
            v-model="form.panneauActive"
            label="Panneau domotique alimenté (25 pts)"
            help="25 points pour un panneau alimenté (interrupteur fermé) à la fin du match"
          />
          <InputCheckbox
            v-model="form.abeillePresente"
            label="Abeille déposée sur la ruche (5 pts)"
            help="5 points pour la dépose de l’abeille sur la ruche"
          />
          <InputCheckbox
            v-model="form.fleurButinee"
            label="Fleur butinée (50 pts)"
            help="50 points pour une fleur butinée (ballon éclaté)"
          />
          <InputEstimation
            v-model="form.estimation"
            help="Voir tableau page 31"
            @set-estimation="data.setEstimation()"
          />
          <InputCheckbox
            v-model="form.nonForfait"
            label="Non forfait (10 pts)"
            hel="10 points bonus sont attribués à toutes les équipes qui ne sont pas &quot;forfait&quot;"
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
import { Data2018 } from '@/data/Data2018';
import { useCdrData } from '@/providers/useCdrData';

const YEAR = '2018';

const data = useCdrData(Data2018);
const { form } = data;
</script>
