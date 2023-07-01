import { ref } from 'vue'

import type { Optional } from '../types'
import { useEvent } from './useEvent'

type OnChange = (newElement: Optional<HTMLElement>, previousElement: Optional<HTMLElement>) => void

export function useNodeRef(onChange?: OnChange) {
  const onChangeHandler = useEvent(onChange)
  const node = ref<Optional<HTMLElement>>()
  const setNodeRef = (element: Optional<HTMLElement>) => {
    if (element !== node.value) {
      onChangeHandler?.value?.(element, node.value)
    }

    node.value = element
  }

  return [node, setNodeRef] as const
}
