<script setup lang="ts">
import Plotly from 'plotly.js-dist-min'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  data: Plotly.Data[]
  layout?: Partial<Plotly.Layout>
  config?: Partial<Plotly.Config>
}>()
const graph = ref<HTMLDivElement>()
onMounted(() => {
  if (!graph.value) return
  Plotly.newPlot(graph.value, props.data, props.layout, props.config)
})
</script>
<template>
  <div ref="graph" />
</template>
<style module lang="scss"></style>
