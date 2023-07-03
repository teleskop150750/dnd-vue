import type { Optional } from '@nado/dnd-kit-utilities'

import type { ClientRect } from '../../types'
import type { Collision, CollisionDescriptor } from './types'

/**
 * Сортирует объекты CollisionDescriptor по возрастанию значения value.
 *
 * @param {CollisionDescriptor} a - Первый объект CollisionDescriptor для сравнения.
 * @param {CollisionDescriptor} b - Второй объект CollisionDescriptor для сравнения.
 * @returns {number} Результат сравнения (отрицательное значение, если a меньше b; положительное значение, если a больше b; и 0, если a равно b).
 */
export function sortCollisionsAsc(
  { data: { value: a } }: CollisionDescriptor,
  { data: { value: b } }: CollisionDescriptor,
) {
  return a - b
}

/**
 * Сортирует объекты CollisionDescriptor по убыванию значения свойства 'value'.
 *
 * @param {CollisionDescriptor} a - Первый объект CollisionDescriptor для сравнения.
 * @param {CollisionDescriptor} b - Второй объект CollisionDescriptor для сравнения.
 * @returns {number} Возвращает положительное число, если 'a' меньше 'b', отрицательное число, если 'a' больше 'b', иначе 0.
 */
export function sortCollisionsDesc(
  { data: { value: a } }: CollisionDescriptor,
  { data: { value: b } }: CollisionDescriptor,
) {
  return b - a
}

/**
 * Вычисляет координаты углов прямоугольника на основе объекта ClientRect.
 *
 * @param {Object} param - Объект ClientRect с координатами и размерами прямоугольника.
 * @returns {Array<Object>} Массив объектов с координатами углов прямоугольника (верхний левый, верхний правый, нижний левый и нижний правый).
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
 * Возвращает первое столкновение из массива столкновений или значение указанного свойства первого столкновения.
 *
 * @param {Optional<Collision[]>} collisions - Массив столкновений.
 * @param {keyof Collision} [property] - Необязательное свойство столкновения, значение которого должно быть возвращено.
 * @returns {Optional<Collision> | Optional<Collision[T]>} Возвращает первое столкновение или значение указанного свойства первого столкновения. Если массив столкновений пуст или не определен, возвращает undefined.
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
