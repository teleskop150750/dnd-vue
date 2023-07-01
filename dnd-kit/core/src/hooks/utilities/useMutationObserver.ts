import { isNil } from '@nado/dnd-kit-utilities'
import { computed, watchEffect } from 'vue'

interface Arguments {
  callback: MutationCallback
  disabled?: boolean
}

// TODO использовать vueuse
/**
 * Возвращает новый экземпляр `MutationObserver`.
 * Если `MutationObserver` не определен в текущей среде выполнения, возвращает `undefined`.
 */
export function useMutationObserver({ callback, disabled }: Arguments) {
  const mutationObserver = computed(() => {
    if (disabled || isNil(window) || isNil(window.MutationObserver)) {
      return undefined
    }

    const { MutationObserver } = window

    return new MutationObserver(callback)
  })

  watchEffect((onCleanUp) => {
    onCleanUp(() => {
      mutationObserver.value?.disconnect()
    })
  })

  return mutationObserver
}
