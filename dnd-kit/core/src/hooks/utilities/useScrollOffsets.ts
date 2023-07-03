import { add, isNil, type Optional } from '@nado/dnd-kit-utilities'
import type { ComputedRef } from 'vue'
import { computed, ref, shallowRef, watch } from 'vue'

import type { Coordinates } from '../../types'
import { defaultCoordinates, getScrollableElement, getScrollCoordinates, getScrollOffsets } from '../../utilities'

type ScrollCoordinatesMap = Map<HTMLElement | Window, Coordinates>

export function useScrollOffsets(elements: ComputedRef<Element[]>): ComputedRef<Coordinates> {
  const scrollCoordinatesMap = ref<Optional<ScrollCoordinatesMap>>(undefined)
  const prevElements = shallowRef(elements.value)

  // TODO: Throttle the handleScroll callback
  function handleScroll(event: Event) {
    if (!scrollCoordinatesMap.value) {
      return undefined
    }

    const scrollingElement = getScrollableElement(event.target ?? undefined)

    if (!scrollingElement) {
      return
    }

    scrollCoordinatesMap.value.set(scrollingElement, getScrollCoordinates(scrollingElement))

    scrollCoordinatesMap.value = new Map(scrollCoordinatesMap.value)
  }

  function cleanup(els: Element[]) {
    els.forEach((element) => {
      const scrollableElement = getScrollableElement(element)

      scrollableElement?.removeEventListener('scroll', handleScroll)
    })
  }

  watch(
    [() => elements.value],
    (_value, _oldValue, onCleanup) => {
      const previousElements = prevElements.value

      if (elements.value !== previousElements) {
        cleanup(previousElements)

        const entries = elements.value
          .map((element) => {
            const scrollableElement = getScrollableElement(element)

            if (!scrollableElement) {
              return undefined
            }

            scrollableElement.addEventListener('scroll', handleScroll, {
              passive: true,
            })

            return [scrollableElement, getScrollCoordinates(scrollableElement)] as const
          })
          .filter((entry): entry is [HTMLElement | (Window & typeof globalThis), Coordinates] => !isNil(entry))

        scrollCoordinatesMap.value = entries.length > 0 ? new Map(entries) : undefined

        prevElements.value = elements.value
      }

      onCleanup(() => {
        cleanup(elements.value)
        cleanup(previousElements)
      })
    },
    { immediate: true },
  )

  // TODO поменял на add(defaultCoordinates, ...scrollCoordinatesMap.value.values())
  return computed(() => {
    if (elements.value.length > 0) {
      scrollCoordinatesMap.value
        ? add(defaultCoordinates, ...scrollCoordinatesMap.value.values())
        : getScrollOffsets(elements.value)
    }

    return defaultCoordinates
  })
}
