import { isNil } from '@nado/dnd-kit-utilities'
import { tryOnScopeDispose } from '@vueuse/core'
import { shallowRef, watch } from 'vue'

interface Arguments {
  callback: ResizeObserverCallback
  disabled?: boolean
}

/**
 * Возвращает новый экземпляр ResizeObserver, привязанный к обратному вызову onResize.
 * Если ResizeObserver не определен в текущей среде выполнения, возвращает undefined.
 */
export function useResizeObserver(props: Arguments) {
  const resizeObserver = shallowRef<ResizeObserver>()

  function cleanup() {
    if (resizeObserver.value) {
      resizeObserver.value.disconnect()
      resizeObserver.value = undefined
    }
  }

  const stopWatch = watch(
    () => props.disabled,
    () => {
      if (props.disabled || isNil(window) || isNil(window.ResizeObserver)) {
        return undefined
      }

      const { ResizeObserver } = window

      resizeObserver.value = new ResizeObserver(props.callback)
    },
    { immediate: true },
  )

  function stop() {
    cleanup()
    stopWatch()
  }

  tryOnScopeDispose(stop)

  return resizeObserver
}
