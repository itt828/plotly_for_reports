<script setup lang="ts">
defineProps<{
  label: string
}>()
const model = defineModel<string>()
</script>
<template>
  <label>
    <input v-model="model" type="checkbox" />
    {{ label }}
  </label>
</template>
<style lang="scss" module></style>
