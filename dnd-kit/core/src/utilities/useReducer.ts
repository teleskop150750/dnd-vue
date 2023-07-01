import { type Ref, ref } from 'vue'

export function useReducer(
  reducer: any,
  initialState: any,
  init?: (value?: any) => any,
): [Ref<any>, (action?: any) => void] {
  const state = ref(initialState)

  if (init) {
    state.value = init()
  }

  const dispatch = (action?: any) => {
    state.value = reducer(state.value, action)
  }

  return [state, dispatch]
}
