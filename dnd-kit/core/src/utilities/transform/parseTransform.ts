import type { Optional, Transform } from '@nado/dnd-kit-utilities'

/**
 * Разбирает строку с CSS-трансформацией и возвращает объект с координатами X, Y и масштабами scaleX, scaleY.
 * Возвращает объект с координатами и масштабами или undefined, если трансформация не поддерживается.
 *
 * @param {string} transform - Строка с CSS-трансформацией.
 * @returns {Optional<Transform>} Объект с координатами и масштабами или undefined.
 */
export function parseTransform(transform: string): Optional<Transform> {
  if (transform.startsWith('matrix3d(')) {
    const transformArray = transform.slice(9, -1).split(/, /)

    return {
      x: Number(transformArray[12]),
      y: Number(transformArray[13]),
      scaleX: Number(transformArray[0]),
      scaleY: Number(transformArray[5]),
    }
  }

  if (transform.startsWith('matrix(')) {
    const transformArray = transform.slice(7, -1).split(/, /)

    return {
      x: Number(transformArray[4]),
      y: Number(transformArray[5]),
      scaleX: Number(transformArray[0]),
      scaleY: Number(transformArray[3]),
    }
  }

  return undefined
}
