/**
 * Предотвращает выполнение события, если это возможно.
 *
 * @param {Event} event - Объект события, которое нужно предотвратить.
 */
export function preventEvent(event: Event) {
  event.cancelable !== false && event.preventDefault()
}
