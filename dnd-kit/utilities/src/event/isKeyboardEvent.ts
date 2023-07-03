import { getWindow } from '../execution-context'
import type { Nillable } from '../types'

/**
 * Проверяет, является ли событие событием клавиатуры.
 *
 * @param {Nillable<Event>} event - Объект события для проверки.
 * @returns {boolean} Возвращает `true`, если событие является экземпляром `KeyboardEvent`, иначе `false`.
 */
export function isKeyboardEvent(event: Nillable<Event>): event is KeyboardEvent {
  if (!event) {
    return false
  }

  const { KeyboardEvent } = getWindow(event.target)

  return KeyboardEvent && event instanceof KeyboardEvent
}
