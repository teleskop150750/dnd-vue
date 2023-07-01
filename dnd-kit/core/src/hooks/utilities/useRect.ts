import { isNil, type Optional } from '@nado/dnd-kit-utilities'
import type { ComputedRef } from 'vue'
import { computed, ref, watch } from 'vue'

import type { ClientRect } from '../../types'
import { getClientRect, Rect } from '../../utilities'
import { useMutationObserver } from './useMutationObserver'
import { useResizeObserver } from './useResizeObserver'

function defaultMeasure(element: HTMLElement) {
  return new Rect(getClientRect(element), element)
}

export function useRect(
  element: ComputedRef<Optional<HTMLElement>>,
  measure: ComputedRef<(element: HTMLElement) => ClientRect> = computed(() => defaultMeasure),
  fallbackRect: ComputedRef<Optional<ClientRect>> | undefined = undefined,
) {
  const rect = ref<ClientRect>()

  const mutationObserver = useMutationObserver({
    callback(records) {
      if (!element.value) {
        return
      }

      for (const record of records) {
        const { type, target } = record

        if (type === 'childList' && target instanceof HTMLElement && target.contains(element.value)) {
          measureRect(rect.value)
          break
        }
      }
    },
  })
  const resizeObserver = useResizeObserver({
    callback: () => {
      measureRect(rect.value)
    },
  })

  watch(
    [element, measure, () => fallbackRect?.value],
    () => {
      measureRect(rect.value)

      if (element && element.value) {
        resizeObserver.value?.observe(element.value)
        mutationObserver.value?.observe(document.body, {
          childList: true,
          subtree: true,
        })
      } else {
        resizeObserver.value?.disconnect()
        mutationObserver.value?.disconnect()
      }
    },
    { immediate: true },
  )

  return rect

  function measureRect(currentRect: Optional<ClientRect>) {
    if (isNil(element.value)) {
      rect.value = undefined

      return
    }

    if (element.value.isConnected === false) {
      // Возвращайтесь к последнему измеренному прямоугольнику,
      // если элемент больше не связан с DOM.
      rect.value = currentRect ?? fallbackRect?.value ?? undefined

      return
    }

    const newRect = measure.value(element.value)

    if (JSON.stringify(currentRect) !== JSON.stringify(newRect)) {
      rect.value = newRect
    }
  }
}
