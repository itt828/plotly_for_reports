<script setup lang="ts">
defineProps<{
  label: string
}>()
const model = defineModel<boolean>()
</script>
<template>
  <label>
    <input v-model="model" type="checkbox" />
    {{ label }}
  </label>
</template>
<style lang="scss" module></style>
