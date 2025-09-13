<template>
  <v-btn
    icon="mdi-share-variant"
    @click="share()"
  />

  <v-dialog
    v-model="showDialog"
    width="auto"
  >
    <v-card
      :title="t('share.title')"
      :text="url"
    >
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
          :text="t('share.copy')"
          @click="copy()"
        />
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
    year: string,
    value: string,
}>();

const showDialog = ref(false);
const url = ref('');

function share() {
    url.value = `${window.location.protocol}//${window.location.host}/#/${props.year}?c=${props.value}`;

    if (window.navigator.share) {
        window.navigator.share({
            title: t('appName'),
            url: url.value,
        });
    }
    else {
        showDialog.value = true;
    }
}

function copy() {
    if (window.navigator.clipboard) {
        window.navigator.clipboard.writeText(url.value);
    }
    else {
        alert('Clipboard is not available');
    }
    showDialog.value = false;
}
</script>
