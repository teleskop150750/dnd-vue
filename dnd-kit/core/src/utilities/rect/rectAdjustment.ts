import type { ClientRect, Coordinates } from '../../types'

/**
 * Создает функцию для корректировки объекта ClientRect с использованием указанного коэффициента.
 *
 * @param {number} modifier - Коэффициент, используемый для корректировки координат.
 * @returns {function} Функция для корректировки объекта ClientRect.
 */
export function createRectAdjustmentFn(modifier: number) {
  /**
   * Корректирует объект ClientRect с использованием указанных координат.
   *
   * @param {ClientRect} rect - Объект ClientRect, который нужно скорректировать.
   * @param {...Coordinates[]} adjustments - Массив координат для корректировки.
   *
   * @returns {ClientRect} Скорректированный объект ClientRect.
   */
  return function adjustClientRect(rect: ClientRect, ...adjustments: Coordinates[]): ClientRect {
    return adjustments.reduce<ClientRect>(
      (acc, adjustment) => ({
        ...acc,
        top: acc.top + modifier * adjustment.y,
        bottom: acc.bottom + modifier * adjustment.y,
        left: acc.left + modifier * adjustment.x,
        right: acc.right + modifier * adjustment.x,
      }),
      { ...rect },
    )
  }
}

/**
 * Функция для корректировки объекта ClientRect с использованием координат.
 */
export const getAdjustedRect = createRectAdjustmentFn(1)
