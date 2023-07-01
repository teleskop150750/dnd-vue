<script setup lang="ts">
import type { CSSProperties } from 'vue'

interface Props {
  id: string
  value: string
}

defineProps<Props>()

const hiddenStyles: CSSProperties = {
  display: 'none',
}
</script>

<template>
  <div :id="id" :style="hiddenStyles">
    {{ value }}
  </div>
</template>
