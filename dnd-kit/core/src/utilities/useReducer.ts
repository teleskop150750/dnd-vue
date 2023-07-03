/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Ref, ref, type UnwrapRef } from 'vue'

export type Reducer<T> = () => UnwrapRef<T>

export function useReducer<T>(reducer: Reducer<T>, initialState: T): [Ref<UnwrapRef<T>>, () => void] {
  const state: Ref<UnwrapRef<T>> = ref(initialState) as any

  const dispatch = (): void => {
    state.value = reducer()
  }

  return [state, dispatch]
}
