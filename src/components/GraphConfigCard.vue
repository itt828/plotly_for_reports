<script setup lang="ts">
import type { GraphConfig } from '/@/types'
const model = defineModel<GraphConfig>({ default: {} })
</script>
<template>
  <div :class="$style.editor">
    x軸
    <div :class="$style.item">
      軸タイトル
      <input v-model="model.x.title" />
    </div>
    <div :class="$style.item">
      最小値
      <input v-model="model.x.min" type="number" />
    </div>
    <div :class="$style.item">
      最大値
      <input v-model="model.x.max" type="number" />
    </div>
    y軸
    <div :class="$style.item">
      軸タイトル
      <input v-model="model.y.title" />
    </div>
    <div :class="$style.item">
      最小値
      <input v-model="model.y.min" type="number" />
    </div>
    <div :class="$style.item">
      最大値
      <input v-model="model.y.max" type="number" />
    </div>
  </div>
</template>
<style lang="scss" module>
.editor {
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 16px;
  background-color: rgba(#ffffff, 0.1);
  box-shadow: 0px 4px 12px 0px rgba(#000000, 0.2);
  position: relative;
  gap: 16px;
}
.item {
  display: flex;
  flex-direction: column;
  align-items: start;
}
</style>
