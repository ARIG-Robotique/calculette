<template>
  <v-toolbar :height="height">
    <div class="d-flex flex-wrap ga-2 ml-2">
      <slot />
    </div>

    <template #append>
      <div class="d-none d-sm-block">
        <BtnPdf
          class="d-lg-none"
          :year="year"
        />
        <BtnShare
          :year="year"
          :value="data.serializedForm"
        />
        <BtnFavorites
          :year="year"
          :total="data.total"
          :form="data.form"
        />
      </div>

      <v-btn
        icon
        class="d-sm-none"
      >
        <v-icon icon="mdi-dots-vertical" />
        <v-speed-dial
          location="bottom"
          activator="parent"
        >
          <BtnPdf
            key="1" 
            color="accent"
            :year="year"
          />
          <BtnShare
            key="2"
            color="accent"
            :year="year"
            :value="data.serializedForm"
          />
          <BtnFavorites
            key="3"
            color="accent"
            :year="year"
            :total="data.total"
            :form="data.form"
          />
        </v-speed-dial>
      </v-btn>
    </template>
  </v-toolbar>
</template>

<script setup lang="ts">
import BtnFavorites from '@/components/BtnFavorites.vue';
import BtnPdf from '@/components/BtnPdf.vue';
import BtnShare from '@/components/BtnShare.vue';
import type { CdrController } from '@/providers/useCdrData';
import { computed } from 'vue';
import { useDisplay } from 'vuetify';

const { xs } = useDisplay();

const props = defineProps<{
  year: string,
  data: CdrController<any>,
  mobileMode?: boolean;
}>();

const height = computed(() => props.mobileMode && xs.value ? 92 : 48);
</script>
