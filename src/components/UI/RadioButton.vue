<script setup lang="ts">
defineProps<{
  value: string
  label: string
}>()
const model = defineModel<string>()
</script>

<template>
  <label>
    <input v-model="model" type="radio" :value="value" />
    {{ label }}
  </label>
</template>
<style lang="scss" module></style>
