<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { xyFromCsv } from '/@/utils/xyCsv'
import { Scatter } from '/@/types'
import CheckBox from './UI/CheckBox.vue'
import RadioButton from './UI/RadioButton.vue'

const emit = defineEmits<{
  delete: []
}>()

const model = defineModel<Scatter>({
  default: {
    x: [],
    y: [],
    mode: 'markers',
    type: 'scatter',
    line: { shape: 'spline' },
    show: true,
    color: '#000000'
  }
})
const column = ref({ x: 0, y: 1 })
const xyRaw = ref('')
watchEffect(() => {
  const result = xyFromCsv(xyRaw.value, column.value.x, column.value.y)
  if (!result) return
  model.value.x = result.x
  model.value.y = result.y
})
const plotMode = ref(
  model.value.mode === 'lines'
    ? {
        lines: true,
        markers: false
      }
    : model.value.mode === 'markers'
      ? {
          lines: false,
          markers: true
        }
      : model.value.mode === 'lines+markers'
        ? {
            lines: true,
            markers: true
          }
        : {
            lines: false,
            markers: false
          }
)

watchEffect(() => {
  if (plotMode.value.lines && plotMode.value.markers) {
    model.value.mode = 'lines+markers'
  } else if (plotMode.value.lines && !plotMode.value.markers) {
    model.value.mode = 'lines'
  } else if (!plotMode.value.lines && plotMode.value.markers) {
    model.value.mode = 'markers'
  } else {
    model.value.mode = 'markers'
  }
})

const onClose = () => {
  emit('delete')
}
</script>

<template>
  <div :class="$style.editor">
    <div :class="$style.item">
      CSV
      <textarea v-model="xyRaw" :class="$style.textarea" />
    </div>
    <div :class="$style.plotConfig">
      <div :class="$style.item">
        表示
        <CheckBox v-model="model.show" label="表示" />
      </div>

      <div :class="$style.item">
        ライン、マーカー
        <div :class="$style.lineMarkerCheckBox">
          <CheckBox v-model="plotMode.lines" label="ライン" />
          <CheckBox v-model="plotMode.markers" label="マーカー" />
        </div>
      </div>
      <div :class="$style.item">
        線の種類
        <div :class="$style.lineRadioMenu">
          <RadioButton v-model="model.line.shape" label="直線" value="linear" />
          <RadioButton
            v-model="model.line.shape"
            label="平滑線"
            value="spline"
          />
        </div>
      </div>
      <div :class="$style.item">
        色
        <input v-model="model.color" type="color" />
      </div>
      <div :class="$style.item">
        列
        <div>x: <input v-model="column.x" type="number" /></div>
        <div>y: <input v-model="column.y" type="number" /></div>
      </div>
    </div>
    <button :class="$style.deleteButton" @click="onClose">X</button>
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
  position: relative;
  gap: 16px;
}
.plotConfig {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: end;
  gap: 16px;
}
.lineMarkerCheckBox {
  display: flex;
  flex-direction: column;
  align-items: start;
}
.lineRadioMenu {
  display: flex;
  flex-direction: column;
  align-items: start;
}
.textarea {
  height: 100%;
  width: 80px;
  resize: vertical;
}
.deleteButton {
  width: 40px;
  height: 40px;
  display: grid;
  place-content: center;
  position: absolute;
  right: 0;
  top: 0;
}
.item {
  display: flex;
  flex-direction: column;
  align-items: start;
}
</style>
