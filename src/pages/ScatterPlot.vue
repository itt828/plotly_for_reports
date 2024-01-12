<script setup lang="ts">
import type { Config, Layout } from 'plotly.js-dist-min'
import { Ref, ref } from 'vue'
import PlotlyGraph from '../components/PlotlyGraph.vue'
import PlotDataCard from '../components/PlotDataCard.vue'

type Scatter = {
  type: 'scatter'
  mode: 'markers' | 'lines'
  x: number[]
  y: number[]
  line: { shape: 'spline' }
}

const data: Ref<Scatter[]> = ref([
  {
    type: 'scatter',
    mode: 'markers',
    x: [1, 4, 3, 25, 6],
    y: [2, 2, 10, 9, 23],
    line: { shape: 'spline' }
  },
  {
    type: 'scatter',
    mode: 'lines',
    x: [1, 4, 3, 25, 6],
    y: [2, 2, 10, 9, 23],
    line: { shape: 'spline' }
  }
])

const addData = () => {
  data.value = [
    ...data.value,
    {
      type: 'scatter',
      mode: 'markers',
      x: [1, 4, 3, 25, 6],
      y: [2, 2, 10, 9, 23],
      line: { shape: 'spline' }
    }
  ]
}

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
    range: [0, 30]
  },
  yaxis: {
    title: 'fuga',
    ticklen: 8,
    mirror: 'all',
    ticks: 'inside',
    linecolor: '#000000',
    showline: true,
    zeroline: false,
    range: [0, 30]
  }
})
const config: Partial<Config> = {}
</script>
<template>
  <div :class="$style.container">
    <PlotlyGraph :data="data" :layout="layout" :config="config" />
    <div v-for="(_datum, i) in data" :key="i" :class="$style.item">
      <PlotDataCard v-model="data[i]" />
      <button :class="$style.deleteButton">X</button>
    </div>
    <button @click="addData">追加</button>
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
.item {
  display: flex;
}
.deleteButton {
  width: 40px;
  height: 40px;
  display: grid;
  place-content: center;
}
</style>
