type ReturnType = Event & Pick<PointerEvent, 'clientX' | 'clientY'>

/**
 * Имеет `clientX` и `clientY` в `Event`
 *
 * @param event Event
 */
export function hasViewportRelativeCoordinates(event: Event): event is ReturnType {
  return 'clientX' in event && 'clientY' in event
}
