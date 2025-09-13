<template>
  <v-toolbar density="compact">
    <div class="d-flex ga-2 ml-2">
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
          md="6"
          lg="4"
        >
          <InputNumber
            v-model="form.modulesDepart"
            label="Modules lunaires dans la zone de départ (2 pts)"
            help="2 points par module lunaire de sa couleur ou polychrome dans sa zone de départ"
          />
          <InputNumber
            v-model="form.mineraiDepart"
            label="Minerais dans la zone de départ (2 pts)"
            help="2 points par minerai valide dans sa zone de départ"
          />
          <InputNumber
            v-model="form.mineraiSoute"
            label="Minerais dans la soute (3 pts)"
            help="3 points par minerai dans la soute de sa navette"
          />
          <InputNumber
            v-model="form.modulesBase"
            label="Modules lunaires dans une base (10 pts)"
            help="10 points par module lunaire valide"
          />

          <InputCheckbox
            v-model="form.funnyAction"
            label="Funny action (20 pts)"
            help="20 points si au moins un engin spatial réussit son décollage pour Mars"
          />
          <InputCheckbox
            v-model="form.nonForfait"
            label="Non forfait (15 pts)"
            help="15 points bonus sont attribués à toutes les équipes qui ne sont pas &quot;forfait&quot;"
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
import { Data2017 } from '@/data/Data2017';
import { useCdrData } from '@/providers/useCdrData';

const YEAR = '2017';

const data = useCdrData(Data2017);
const { form } = data;
</script>
