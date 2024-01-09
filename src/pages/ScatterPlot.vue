<script setup lang="ts">
import type { Config, Data, Layout } from 'plotly.js-dist-min'
import { Ref, computed, ref, watch } from 'vue'
import { parse } from 'csv-parse/browser/esm/sync'
import PlotlyGraph from '../components/PlotlyGraph.vue'

const data: Ref<Data[]> = ref([
  {
    type: 'scatter',
    mode: 'markers',
    x: [1, 4, 3, 25, 6],
    y: [2, 2, 10, 9, -3]
  },
  {
    type: 'scatter',
    mode: 'lines',
    x: [1, 4, 3, 25, 6],
    y: [2, 2, 10, 9, -3]
  }
])
const layout: Ref<Partial<Layout>> = ref({
  paper_bgcolor: '#ffffff',
  plot_bgcolor: '#ffffff',
  showlegend: false,
  xaxis: {
    title: 'hoge, $\\alpha$',
    ticklen: 8,
    mirror: 'all',
    ticks: 'inside',
    linecolor: '#000000',
    showline: true,
    zeroline: false,
    range: [0, 100]
  },
  yaxis: {
    title: 'fuga',
    ticklen: 8,
    mirror: 'all',
    ticks: 'inside',
    linecolor: '#000000',
    showline: true,
    zeroline: false,
    range: [0, 100]
  }
})
const config: Partial<Config> = {}
const xyRaw = ref('')
const xy = computed(() => {
  try {
    const records = parse(xyRaw.value)
    if (!records.every((v) => v.length == 2)) return
    const x: number[] = records.map((v) => Number(v[0]))
    const y: number[] = records.map((v) => Number(v[1]))
    return { x, y }
  } catch (error) {
    return undefined
  }
})
watch(xyRaw, () => {
  if (!xy.value) return
  data.value = [
    {
      ...xy.value
    }
  ]
})
</script>
<template>
  <div :class="$style.container">
    <PlotlyGraph :data="data" :layout="layout" :config="config" />
    <textarea v-model="xyRaw" :class="$style.textarea"></textarea>
    {{ xy }}
  </div>
</template>
<style module lang="scss">
.container {
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
}
.textarea {
  width: 100px;
  height: 40px;
}
</style>
