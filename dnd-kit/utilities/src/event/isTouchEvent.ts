import { getWindow } from '../execution-context'
import type { Nillable } from '../types'

/**
 * Это `TouchEvent` `Event`
 *
 * @param event Event
 */
export function isTouchEvent(event: Nillable<Event>): event is TouchEvent {
  if (!event) {
    return false
  }

  const { TouchEvent } = getWindow(event.target)

  return TouchEvent && event instanceof TouchEvent
}
