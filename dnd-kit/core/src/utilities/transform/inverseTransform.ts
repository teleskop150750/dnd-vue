import type { ClientRect } from '../../types'
import { parseTransform } from './parseTransform'

/**
 * Inverse Transform
 * @param rect ClientRect
 * @param transform CSS Transform string
 * @param transformOrigin CSS TransformOrigin string
 */
export function inverseTransform(rect: ClientRect, transform: string, transformOrigin: string): ClientRect {
  const parsedTransform = parseTransform(transform)

  if (!parsedTransform) {
    return rect
  }

  const { scaleX, scaleY, x: translateX, y: translateY } = parsedTransform

  const parsedTransformOriginX = Number.parseFloat(transformOrigin)
  const parsedTransformOriginY = Number.parseFloat(transformOrigin.slice(transformOrigin.indexOf(' ') + 1))

  const x = rect.left - translateX - (1 - scaleX) * parsedTransformOriginX
  const y = rect.top - translateY - (1 - scaleY) * parsedTransformOriginY
  const w = scaleX ? rect.width / scaleX : rect.width
  const h = scaleY ? rect.height / scaleY : rect.height

  return {
    width: w,
    height: h,
    top: y,
    right: x + w,
    bottom: y + h,
    left: x,
  }
}
