import type { Optional } from '@nado/dnd-kit-utilities'
import { type MaybeRefOrGetter, type Ref, ref, toValue, watch, watchEffect } from 'vue'

import { getScrollableAncestors } from '../../utilities'

const defaultValue: Element[] = []

// TODO Убрал useLazyMemo
export function useScrollableAncestors(node: MaybeRefOrGetter<Optional<HTMLElement>>) {
  const previousNode = ref(toValue(node))
  const ancestors = ref(defaultValue)

  watch(
    () => toValue(node),
    () => {
      ancestors.value = getAncestors(ancestors)
    },
  )

  function getAncestors(prevVal: Ref<Element[]>) {
    const nodeVal = toValue(node)

    if (!nodeVal) {
      return defaultValue
    }

    if (!prevVal.value) {
      return getScrollableAncestors(nodeVal)
    }

    if (prevVal.value === defaultValue) {
      return getScrollableAncestors(nodeVal)
    }

    if (!previousNode.value || previousNode.value.parentNode !== nodeVal.parentNode) {
      return getScrollableAncestors(nodeVal)
    }

    return prevVal.value
  }

  watchEffect(() => {
    previousNode.value = toValue(node)
  })

  return ancestors
}
