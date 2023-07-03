import type { Optional, Transform } from '@nado/dnd-kit-utilities'

import type { Active, Over } from '../store'
import type { ClientRect } from '../types'

export type Modifier = (args: {
  activatorEvent: Optional<Event>
  active: Optional<Active>
  activeNodeRect: Optional<ClientRect>
  draggingNodeRect: Optional<ClientRect>
  containerNodeRect: Optional<ClientRect>
  over: Optional<Over>
  overlayNodeRect: Optional<ClientRect>
  scrollableAncestors: Element[]
  scrollableAncestorRects: ClientRect[]
  transform: Transform
  windowRect: Optional<ClientRect>
}) => Transform

export type Modifiers = Modifier[]
