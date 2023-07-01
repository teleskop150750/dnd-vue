import type { Optional, Transform } from '@nado/dnd-kit-utilities'

/**
 * Parse CSS Transform string
 *
 * @param transform CSS Transform string
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
