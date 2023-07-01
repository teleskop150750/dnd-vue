export function preventEvent(event: Event) {
  event.cancelable !== false && event.preventDefault()
}
