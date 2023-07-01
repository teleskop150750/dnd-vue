import { getWindow } from '../execution-context'
import type { Nillable } from '../types'

/**
 * Это `KeyboardEvent` `Event`
 *
 * @param event Event
 */
export function isKeyboardEvent(event: Nillable<Event>): event is KeyboardEvent {
  if (!event) {
    return false
  }

  const { KeyboardEvent } = getWindow(event.target)

  return KeyboardEvent && event instanceof KeyboardEvent
}
