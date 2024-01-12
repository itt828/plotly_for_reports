<script setup lang="ts">
import { computed } from 'vue'
import { xyFromCsv, xyToCsv } from '/@/utils/xyCsv'
import { Scatter } from '/@/types'
import CheckBox from './UI/CheckBox.vue'
import RadioButton from './UI/RadioButton.vue'

const model = defineModel<Scatter>({
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
      <textarea v-model="xyRaw" :class="$style.textarea" />
    </div>
    <div :class="$style.plotConfig">
      <p>線 and/or 点</p>
      <div>
        <CheckBox label="ライン" />
        <CheckBox label="マーカー" />
      </div>
      <p>線の種類</p>
      <div>
        <RadioButton v-model="model.line.shape" label="直線" value="linear" />
        <RadioButton v-model="model.line.shape" label="平滑線" value="spline" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" module>
.editor {
  display: flex;
  flex-direction: row;
  padding: 16px;
  border-radius: 16px;
  background-color: rgba(#ffffff, 0.1);
  box-shadow: 0px 4px 12px 0px rgba(#000000, 0.2);
}
.plotConfig {
  display: flex;
  flex-direction: column;
  align-items: left;
}
.textarea {
  height: 100%;
}
</style>
