<template>
  <embed
    :src="pdfUrl + '#view=Fit&pagemode=none'"
    type="application/pdf"
    style="width: 100%; aspect-ratio: 1.4; border: none;"
  >
</template>

<script setup lang="ts">
import { CONTESTS } from '@/data/contests';
import { computed } from 'vue';

const props = defineProps<{ year: string }>();

const pdfUrl = computed(() => CONTESTS[props.year].pdfUrl);
</script>
