<script setup lang="ts">
import type Plotly from 'plotly.js-dist-min'
import { Ref, ref } from 'vue'
import PlotlyGraph from '../components/PlotlyGraph.vue'
const data: Ref<Plotly.Data[]> = ref([
  {
    x: [1, 4, 3, 25, 6],
    y: [2, 2, 10, 9, -3]
  }
])
</script>
<template>
  <PlotlyGraph :data="data" />
</template>
<style module lang="scss"></style>
