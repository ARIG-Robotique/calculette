<template>
  <div class="d-flex justify-end">
    <v-btn
      prepend-icon="mdi-backspace"
      color="accent"
      variant="tonal"
      @click="emit('reset')"
    >
      Reset
    </v-btn>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{ reset: [void] }>();
</script>
