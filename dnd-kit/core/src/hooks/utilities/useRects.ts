import { getWindow } from '@nado/dnd-kit-utilities'
import type { ComputedRef } from 'vue'
import { computed, watch } from 'vue'

import type { ClientRect } from '../../types'
import { isDocumentScrollingElement, useReducer } from '../../utilities'
import { getClientRect, Rect } from '../../utilities/rect'
import { useResizeObserver } from './useResizeObserver'
import { useWindowRect } from './useWindowRect'

const defaultValue: Rect[] = []

// TODO: Доделать
export function useRects(
  elements: ComputedRef<Element[]>,
  measure: (element: Element) => ClientRect = getClientRect,
): ClientRect[] {
  const useWindowRectOption = getWindowRectOption(elements)
  const windowRect = useWindowRect(useWindowRectOption)

  const [rects, measureRects] = useReducer(reducer, defaultValue)
  const resizeObserver = useResizeObserver({ callback: measureRects })

  watch(
    elements,
    () => {
      if (elements.value.length > 0 && rects.value === defaultValue) {
        measureRects()
      }

      if (elements.value.length > 0) {
        elements.value.forEach((element) => resizeObserver.value?.observe(element))
      } else {
        resizeObserver.value?.disconnect()
        measureRects()
      }
    },
    { immediate: true },
  )

  return rects.value

  function reducer() {
    if (elements.value.length === 0) {
      return defaultValue
    }

    return elements.value.map((element) =>
      isDocumentScrollingElement(element) ? (windowRect.value as ClientRect) : new Rect(measure(element), element),
    )
  }
}

function getWindowRectOption(elements: ComputedRef<Element[]>) {
  return computed(() => {
    const [firstElement] = elements.value

    return firstElement ? getWindow(firstElement) : undefined
  })
}
