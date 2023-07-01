import { isNil } from './is'

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
export const add = createAdjustmentFn(1)
export const subtract = createAdjustmentFn(-1)
