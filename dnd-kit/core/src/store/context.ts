import { ref } from 'vue'

// import { defaultMeasuringConfiguration } from '../components/DndContext/defaults'
// import InternalContextProvider from '../CreateContextVueVNode/InternalContextProvider'
// import PublicContextProvider from '../CreateContextVueVNode/PublicContextProvider'
import { noop } from '../utilities/other'
import { DroppableContainersMap } from './DroppableContainersMap'
import type { InternalContextDescriptor, PublicContextDescriptor } from './types'

// TODO
const PublicContextProvider = {} as any
const InternalContextProvider = {} as any
const defaultMeasuringConfiguration = {} as any

export const defaultPublicContext: PublicContextDescriptor = {
  activatorEvent: undefined,
  active: undefined,
  activeNode: undefined,
  activeNodeRect: undefined,
  collisions: undefined,
  containerNodeRect: undefined,
  draggableNodes: new Map(),
  droppableRects: new Map(),
  droppableContainers: new DroppableContainersMap(),
  over: undefined,
  dragOverlay: {
    nodeRef: ref(undefined),
    rect: ref(undefined),
    setRef: noop,
  },
  scrollableAncestors: [],
  scrollableAncestorRects: [],
  measuringConfiguration: defaultMeasuringConfiguration,
  measureDroppableContainers: noop,
  windowRect: undefined,
  measuringScheduled: false,
}

export const defaultInternalContext: InternalContextDescriptor = {
  activatorEvent: undefined,
  activators: [],
  active: undefined,
  activeNodeRect: undefined,
  ariaDescribedById: {
    draggable: '',
  },
  dispatch: noop,
  draggableNodes: new Map(),
  over: undefined,
  measureDroppableContainers: noop,
}

export const InternalContext = {
  Provider: InternalContextProvider,
}

export const PublicContext = {
  Provider: PublicContextProvider,
}
