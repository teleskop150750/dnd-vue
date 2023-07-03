/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Ref, ref } from 'vue'

// Write React implementation of useReducer in Vue.js using Composition API In TypeScript

type Reducer<S, A> = (prevState: S, action: A) => S
type Dispatch<A> = (action: A) => void
type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any> ? S : never
type ReducerAction<R extends Reducer<any, any>> = R extends Reducer<any, infer A> ? A : never

export function useReducer<R extends Reducer<any, any>>(
  reducer: R,
  initialState: ReducerState<R>,
): [ReducerState<R>, Dispatch<ReducerAction<R>>] {
  const state: Ref<ReducerState<R>> = ref(initialState)
  const dispatch: Dispatch<ReducerAction<R>> = (action: ReducerAction<R>) => {
    state.value = reducer(state.value, action)
  }

  return [state.value, dispatch]
}
