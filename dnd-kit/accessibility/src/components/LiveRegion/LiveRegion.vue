<script setup lang="ts">
import type { CSSProperties } from 'vue'

export interface Props {
  id: string
  announcement: string
}

defineProps<Props>()

// Hide element visually but keep it readable by screen readers
const visuallyHidden: CSSProperties = {
  position: 'fixed',
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(100%)',
  whiteSpace: 'nowrap',
}
</script>

<template>
  <div :id="id" :style="visuallyHidden" role="status" aria-live="assertive" aria-atomic>
    {{ announcement }}
  </div>
</template>
