import { computed } from 'vue'

import { isNil } from '../is'

const ids: Record<string, number> = {}

/**
 * Использовать Unique Id
 *
 * @param prefix Prefix
 * @param value Value
 */
export function useUniqueId(prefix: string, value?: string) {
  return computed(() => {
    if (value) {
      return value
    }

    const preId = ids[prefix]

    const id = isNil(preId) ? 0 : preId + 1

    ids[prefix] = id

    return `${prefix}-${id}`
  })
}
