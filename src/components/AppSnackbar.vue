<template>
  <v-snackbar
    v-model="snackbar.show.value"
    :timeout="snackbar.timeout"
  >
    {{ snackbar.content }}
    <template #actions>
      <v-btn
        color="accent"
        icon="mdi-close-circle"
        @click="snackbar.close()"
      />
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useSnackbar } from '@/providers/useSnackbar';

const snackbar = useSnackbar();
</script>
