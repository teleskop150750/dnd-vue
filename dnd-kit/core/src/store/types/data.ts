import type { MutableRefObject } from './foo'

type AnyData = Record<string, any>

export type Data<T = AnyData> = T & AnyData

export type DataRef<T = AnyData> = MutableRefObject<Data<T> | undefined>
