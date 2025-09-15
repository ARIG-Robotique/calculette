<template>
  <v-snackbar
    v-model="snackbar.isVisible.value"
    :timeout="timeout"
  >
    {{ content }}
    <template #actions>
      <v-btn
        color="accent"
        icon="mdi-close-circle"
        @click="snackbar.hide()"
      />
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useAppCdrCtrl } from '@/providers/useAppCdr';
import { computed } from 'vue';

const { snackbar } = useAppCdrCtrl();

const timeout = computed(() => snackbar.data.value.timeout);
const content = computed(() => snackbar.data.value.content);
</script>
