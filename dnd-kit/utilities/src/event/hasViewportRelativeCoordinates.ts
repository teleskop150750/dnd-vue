type ReturnType = Event & Pick<PointerEvent, 'clientX' | 'clientY'>

/**
 * Проверяет, содержат ли `clientX` и `clientY`.
 *
 * @param {Event} event - Объект события для проверки.
 * @returns {boolean} Возвращает `true`, если событие содержит координаты `clientX` и `clientY`, иначе `false`.
 */
export function hasViewportRelativeCoordinates(event: Event): event is ReturnType {
  return 'clientX' in event && 'clientY' in event
}
