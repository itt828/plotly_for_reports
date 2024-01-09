<script setup lang="ts">
import type { Data, Layout, Config } from 'plotly.js-dist-min'
import { newPlot } from 'plotly.js-dist-min'
import { onMounted, ref, watchEffect } from 'vue'

const props = defineProps<{
  data: Data[]
  layout?: Partial<Layout>
  config?: Partial<Config>
}>()
const graph = ref<HTMLDivElement>()
onMounted(() => {
  if (!graph.value) return
  newPlot(graph.value, props.data, props.layout, props.config)
})
watchEffect(() => {
  if (!graph.value) return
  newPlot(graph.value, props.data, props.layout, props.config)
})
</script>
<template>
  <div ref="graph" />
</template>
<style module lang="scss"></style>
