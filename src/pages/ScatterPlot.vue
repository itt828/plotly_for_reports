<script setup lang="ts">
import type { Config, Layout } from 'plotly.js-dist-min'
import { Ref, computed, ref, watchEffect } from 'vue'
import PlotlyGraph from '../components/PlotlyGraph.vue'
import PlotDataCard from '../components/PlotDataCard.vue'
import GraphConfigCard from '../components/GraphConfigCard.vue'
import { Scatter, GraphConfig } from '/@/types'

const data: Ref<Scatter[]> = ref([
  {
    type: 'scatter',
    mode: 'markers',
    x: [1, 4, 3, 25, 6],
    y: [2, 2, 10, 9, 23],
    line: { shape: 'spline' },
    show: true
  },
  {
    type: 'scatter',
    mode: 'lines',
    x: [1, 4, 3, 25, 6],
    y: [2, 2, 10, 9, 23],
    line: { shape: 'spline' },
    show: true
  }
])
const graphConfig: Ref<GraphConfig> = ref({
  x: {
    title: 'x axis'
  },
  y: {
    title: 'y axis'
  }
})

const dataShow = computed(() => data.value.filter((v) => v.show))

const addData = () => {
  data.value = [
    ...data.value,
    {
      type: 'scatter',
      mode: 'markers',
      x: [1, 4, 3, 25, 6],
      y: [2, 2, 10, 9, 23],
      line: { shape: 'spline' },
      show: true
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
const deleteData = (i: number) => {
  data.value = data.value.filter((_, idx) => i !== idx)
}
watchEffect(() => {
  layout.value.xaxis = {
    ...layout.value.xaxis,
    title: graphConfig.value.x.title,
    range: [graphConfig.value.x.min, graphConfig.value.x.max]
  }
  layout.value.yaxis = {
    ...layout.value.yaxis,
    title: graphConfig.value.y.title,
    range: [graphConfig.value.y.min, graphConfig.value.y.max]
  }
})
</script>
<template>
  <div :class="$style.container">
    <PlotlyGraph :data="dataShow" :layout="layout" :config="config" />
    <div :class="$style.contents">
      <GraphConfigCard v-model="graphConfig" />
      <div :class="$style.plots">
        <div v-for="(_datum, i) in data" :key="i" :class="$style.item">
          <PlotDataCard v-model="data[i]" @delete="() => deleteData(i)" />
        </div>
        <button @click="addData">追加</button>
      </div>
    </div>
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
.contents {
  display: flex;
  gap: 16px;
  align-items: start;
}
.item {
  display: flex;
}
.plots {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
