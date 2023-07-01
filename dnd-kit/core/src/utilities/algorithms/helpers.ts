import type { Optional } from '@nado/dnd-kit-utilities'

import type { ClientRect } from '../../types'
import type { Collision, CollisionDescriptor } from './types'

/**
 * Сортировать collisions от наименьшего к наибольшему значению
 */
export function sortCollisionsAsc(
  { data: { value: a } }: CollisionDescriptor,
  { data: { value: b } }: CollisionDescriptor,
) {
  return a - b
}

/**
 * Сортировать collisions от наибольшего к наименьшему значению
 */
export function sortCollisionsDesc(
  { data: { value: a } }: CollisionDescriptor,
  { data: { value: b } }: CollisionDescriptor,
) {
  return b - a
}

/**
 * Возвращает координаты углов заданного прямоугольника:
 * [TopLeft {x, y}, TopRight {x, y}, BottomLeft {x, y}, BottomRight {x, y}]
 */
export function cornersOfRectangle({ left, top, height, width }: ClientRect) {
  return [
    {
      x: left,
      y: top,
    },
    {
      x: left + width,
      y: top,
    },
    {
      x: left,
      y: top + height,
    },
    {
      x: left + width,
      y: top + height,
    },
  ] as const
}

/**
 * Возвращает первое столкновение или `undefined`, если его нет.
 * Если указано `property`, возвращает указанное `property` первого столкновения.
 */
export function getFirstCollision(collisions: Optional<Collision[]>): Optional<Collision>

export function getFirstCollision<T extends keyof Collision>(
  collisions: Optional<Collision[]>,
  property: T,
): Optional<Collision[T]>

export function getFirstCollision(collisions: Optional<Collision[]>, property?: keyof Collision) {
  if (!collisions || collisions.length === 0) {
    return undefined
  }

  const [firstCollision] = collisions

  if (!firstCollision) {
    return undefined
  }

  return property ? firstCollision[property] : firstCollision
}
