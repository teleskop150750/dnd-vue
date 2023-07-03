/**
 * Проверяет, является ли переданный объект объектом Window.
 *
 * @param {object} element - Объект, который нужно проверить.
 * @returns {boolean} - Возвращает true, если объект является объектом Window, иначе false.
 */
export function isWindow(element: object): element is typeof window {
  const elementString = Object.prototype.toString.call(element)

  return (
    elementString === '[object Window]' ||
    // In Electron context the Window object serializes to [object global]
    elementString === '[object global]'
  )
}
