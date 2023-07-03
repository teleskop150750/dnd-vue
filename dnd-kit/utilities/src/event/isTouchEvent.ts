import { getWindow } from '../execution-context'
import type { Nillable } from '../types'

/**
 * Проверяет, является ли событие событием касания.
 *
 * @param {Nillable<Event>} event - Объект события для проверки или `null`.
 * @returns {boolean} Возвращает `true`, если событие является экземпляром `TouchEvent`, иначе `false`.
 */
export function isTouchEvent(event: Nillable<Event>): event is TouchEvent {
  if (!event) {
    return false
  }

  const { TouchEvent } = getWindow(event.target)

  return TouchEvent && event instanceof TouchEvent
}
