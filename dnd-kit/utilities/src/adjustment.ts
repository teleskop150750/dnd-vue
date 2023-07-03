import { isNil } from './is'

/**
 * Создаёт функцию корректировки числовых значений в объекте.
 *
 * @param {number} modifier - Множитель, который будет применяться к корректировкам (1 для сложения, -1 для вычитания).
 * @returns {<T extends Record<U, number>, U extends string>(object: T, ...adjustments: Array<Partial<T>>): T} Функция, которая принимает объект и массив частичных объектов для корректировки. Возвращает объект с корректированными значениями.
 */
function createAdjustmentFn(modifier: number) {
  return <T extends Record<U, number>, U extends string>(object: T, ...adjustments: Array<Partial<T>>): T => {
    const value = adjustments.reduce<T>(
      (accumulator, curAdjustment) => {
        const entries = Object.entries(curAdjustment) as Array<[U, number]>

        entries.forEach(([key, valueCurAdjustment]) => {
          const prevAccVal = accumulator[key]

          if (!isNil(prevAccVal)) {
            accumulator[key] = (prevAccVal + modifier * valueCurAdjustment) as T[U]
          }
        })

        return accumulator
      },
      {
        ...object,
      },
    )

    return value
  }
}

/**
 * Функция для добавления числовых значений к соответствующим свойствам объекта.
 */
export const add = createAdjustmentFn(1)

/**
 * Функция для вычитания числовых значений от соответствующих свойств объекта.
 */
export const subtract = createAdjustmentFn(-1)
