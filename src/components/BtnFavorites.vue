<template>
  <v-btn
    icon="mdi-star"
    @click="showDialog = true"
  />

  <v-dialog
    v-model="showDialog"
    width="auto"
    min-width="300"
  >
    <v-card :title="t('favorites.title')">
      <v-list>
        <v-list-item
          v-for="favorite in favorites"
          :key="favorite.name"
          :title="favorite.name"
          :subtitle="'(' + favorite.total + ' pts)'"
          @click="applyFavorite(favorite)"
        >
          <template #append>
            <v-btn
              icon="mdi-delete"
              variant="text"
              @click.stop="deleteFavorite(favorite)"
            />
          </template>
        </v-list-item>
      </v-list>

      <v-empty-state
        v-if="favorites.length === 0"
        icon="mdi-star-outline"
        :title="t('favorites.empty')"
      />

      <template #actions>
        <v-btn
          color="primary"
          variant="tonal"
          :text="t('global.close')"
          @click="showDialog = false"
        />
        <v-btn
          color="primary"
          variant="elevated"
          :text="t('favorites.new')"
          prepend-icon="mdi-star-plus"
          @click="showPrompt = true"
        />
      </template>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="showPrompt"
    width="300"
  >
    <v-card :title="t('favorites.name')">
      <v-text-field
        ref="myInput"
        v-model="favoriteName"
      />

      <template #actions>
        <v-btn
          color="primary"
          variant="tonal"
          :text="t('global.cancel')"
          @click="showPrompt = false"
        />
        <v-btn
          color="primary"
          variant="elevated"
          :text="t('global.validate')"
          @click="saveFavorite()"
        />
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useSnackbar } from '@/providers/useSnackbar';
import { computed, nextTick, onMounted, ref, useTemplateRef, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import type { VTextField } from 'vuetify/components';
import { type Favorite } from '../models/Favorite';

const { t } = useI18n();

const props = defineProps<{
    year: string,
    total: number,
    form: Favorite['form'],
}>();
const emit = defineEmits<{
    apply: [favorite: Favorite],
}>();

const lsKey = computed(() => `favorites_${props.year}`);
const myInput = useTemplateRef('myInput');
const showDialog = ref(false);
const showPrompt = ref(false);
const snackbar = useSnackbar();
const favorites = ref([] as Favorite[]);
const favoriteName = ref('');

function saveFavorite() {
    if (favoriteName.value) {
        const favorite = {
            name: favoriteName.value,
            total: props.total,
            form: props.form,
        } satisfies Favorite;
        const idx = favorites.value.findIndex(item => item.name === favorite.name);
        if (idx === -1) {
            favorites.value.push(favorite);
        } else {
            favorites.value.splice(idx, 1, favorite);
        }
        persistFavorites();

        favoriteName.value = '';
        showDialog.value = false;
        snackbar.open(t('favorites.msg'), 3000);
    }

    showPrompt.value = false;
}

function applyFavorite(favorite: Favorite) {
    favoriteName.value = favorite.name;

    emit('apply', favorite);

    showDialog.value = false;
}

function deleteFavorite(favorite: Favorite) {
    const idx = favorites.value.indexOf(favorite);
    favorites.value.splice(idx, 1);
    persistFavorites();
}

function persistFavorites() {
    localStorage[lsKey.value] = JSON.stringify(favorites.value);
}

watch(showPrompt, () => {
    if (showPrompt.value) {
        nextTick(() => {
            setTimeout(() => {
                myInput.value?.focus();
            });
        });
    }
});

onMounted(() => {
    if (localStorage[lsKey.value]) {
        favorites.value = JSON.parse(localStorage[lsKey.value]);
    }
});
</script>
