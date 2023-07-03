import type { ClientRect } from '../../types'
import { Direction } from '../../types'
import { getScrollPosition } from './getScrollPosition'

interface PositionalCoordinates extends Pick<ClientRect, 'top' | 'left' | 'right' | 'bottom'> {}

const defaultThreshold = {
  x: 0.2,
  y: 0.2,
}

/**
 * Получает направление и скорость прокрутки для элемента-контейнера с учетом зоны порогового значения.
 *
 * @param {Element} scrollContainer - Элемент-контейнер прокрутки.
 * @param {ClientRect} scrollContainerRect - Rect, описывающий элемент-контейнер прокрутки.
 * @param {PositionalCoordinates} { top, left, right, bottom } - Координаты Rect, определяющие позицию курсора.
 * @param {number} [acceleration=10] - Коэффициент ускорения прокрутки.
 * @param {object} [thresholdPercentage=defaultThreshold] - Объект с процентными значениями порога по осям X и Y.
 * @returns {object} Объект с направлением и скоростью прокрутки по осям X и Y.
 */
export function getScrollDirectionAndSpeed(
  scrollContainer: Element,
  scrollContainerRect: ClientRect,
  { top, left, right, bottom }: PositionalCoordinates,
  acceleration = 10,
  thresholdPercentage = defaultThreshold,
) {
  const { isTop, isBottom, isLeft, isRight } = getScrollPosition(scrollContainer)

  const direction = {
    x: 0,
    y: 0,
  }
  const speed = {
    x: 0,
    y: 0,
  }
  const threshold = {
    height: scrollContainerRect.height * thresholdPercentage.y,
    width: scrollContainerRect.width * thresholdPercentage.x,
  }

  if (!isTop && top <= scrollContainerRect.top + threshold.height) {
    // Scroll Up
    direction.y = Direction.Backward
    speed.y = acceleration * Math.abs((scrollContainerRect.top + threshold.height - top) / threshold.height)
  } else if (!isBottom && bottom >= scrollContainerRect.bottom - threshold.height) {
    // Scroll Down
    direction.y = Direction.Forward
    speed.y = acceleration * Math.abs((scrollContainerRect.bottom - threshold.height - bottom) / threshold.height)
  }

  if (!isRight && right >= scrollContainerRect.right - threshold.width) {
    // Scroll Right
    direction.x = Direction.Forward
    speed.x = acceleration * Math.abs((scrollContainerRect.right - threshold.width - right) / threshold.width)
  } else if (!isLeft && left <= scrollContainerRect.left + threshold.width) {
    // Scroll Left
    direction.x = Direction.Backward
    speed.x = acceleration * Math.abs((scrollContainerRect.left + threshold.width - left) / threshold.width)
  }

  return {
    direction,
    speed,
  }
}
