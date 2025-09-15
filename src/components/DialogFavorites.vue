<template>
  <v-dialog
    v-model="favorites.isVisible.value"
    width="auto"
    min-width="300"
  >
    <v-card :title="t('favorites.title')">
      <v-list>
        <v-list-item
          v-for="favorite in favoritesList"
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
        v-if="favoritesList.length === 0"
        icon="mdi-star-outline"
        :title="t('favorites.empty')"
      />

      <template #actions>
        <v-btn
          color="primary"
          variant="tonal"
          :text="t('global.close')"
          @click="favorites.hide()"
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
import type { Favorite } from '@/models/Favorite';
import { useAppCdrCtrl } from '@/providers/useAppCdr';
import { nextTick, ref, useTemplateRef, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { favorites, snackbar } = useAppCdrCtrl();

const myInput = useTemplateRef('myInput');
const showPrompt = ref(false);
const favoritesList = ref([] as Favorite[]);
const favoriteName = ref('');

function lsKey(year: string) {
    return `favorites_${year}`;
}

function saveFavorite() {
    if (favoriteName.value) {
        const favorite = {
            name: favoriteName.value,
            total: favorites.data.value.total,
            form: favorites.data.value.form,
        } satisfies Favorite;
        const idx = favoritesList.value.findIndex(item => item.name === favorite.name);
        if (idx === -1) {
            favoritesList.value.push(favorite);
        } else {
            favoritesList.value.splice(idx, 1, favorite);
        }
        persistFavorites();

        favoriteName.value = '';
        favorites.hide();
        snackbar.show(t('favorites.msg'), 3000);
    }

    showPrompt.value = false;
}

function applyFavorite(favorite: Favorite) {
    favoriteName.value = favorite.name;
    favorites.apply(favorite);
}

function deleteFavorite(favorite: Favorite) {
    const idx = favoritesList.value.indexOf(favorite);
    favoritesList.value.splice(idx, 1);
    persistFavorites();
}

function persistFavorites() {
    localStorage[lsKey(favorites.data.value.year)] = JSON.stringify(favoritesList.value);
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

watch(favorites.data, (data) => {
    if (localStorage[lsKey(data.year)]) {
        favoritesList.value = JSON.parse(localStorage[lsKey(data.year)]);
    } else {
        favoritesList.value = [];
    }
});
</script>