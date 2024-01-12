<script setup lang="ts">
import { computed } from 'vue'
import { xyFromCsv, xyToCsv } from '/@/utils/xyCsv'

const model = defineModel<{
  x: number[]
  y: number[]
  type: 'scatter'
  mode: 'markers' | 'lines' | 'lines+markers'
  line: {
    shape: 'spline' | 'linear'
  }
}>({
  default: {
    x: [],
    y: [],
    mode: 'markers',
    type: 'scatter',
    line: { shape: 'spline' }
  }
})
const xyRaw = computed({
  get: () => {
    return xyToCsv(model.value.x, model.value.y)
  },
  set: (v) => {
    const result = xyFromCsv(v)
    if (!result) return
    model.value.x = result.x
    model.value.y = result.y
  }
})
</script>
<template>
  <div :class="$style.editor">
    <div>
      <textarea v-model="xyRaw" />
    </div>
    <div>
      <input id="lines" v-model="model.mode" type="radio" value="lines" />
      <label for="lines">ライン</label>
      <input id="markers" v-model="model.mode" type="radio" value="markers" />
      <label for="markers">マーカー</label>
      <input
        id="lines+markers"
        v-model="model.mode"
        type="radio"
        value="lines+markers"
      />
      <label for="lines+markers">ライン+マーカー</label>
    </div>
    <div>
      <input
        id="linear"
        v-model="model.line.shape"
        type="radio"
        value="linear"
      />
      <label for="linear">直線</label>
      <input
        id="spline"
        v-model="model.line.shape"
        type="radio"
        value="spline"
      />
      <label for="spline">平滑線</label>
    </div>
  </div>
</template>
<style lang="scss" module>
.editor {
  display: flex;
  flex-direction: column;
}
</style>
