<template>
  <v-dialog
    v-model="shareLink.isVisible.value"
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
          @click="shareLink.hide()"
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
import { useAppCdrCtrl } from '@/providers/useAppCdr';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { shareLink } = useAppCdrCtrl();

const url = computed(() => shareLink.data.value.url);

function copy() {
    if (window.navigator.clipboard) {
        window.navigator.clipboard.writeText(url.value);
    }
    else {
        alert('Clipboard is not available');
    }
    shareLink.hide();
}
</script>