import { getOwnerDocument } from '@nado/dnd-kit-utilities'

import type { AbstractPointerSensorOptions, PointerEventHandlers } from '../pointer'
import { AbstractPointerSensor } from '../pointer'
import type { SensorProps } from '../types'

const events: PointerEventHandlers = {
  move: { name: 'mousemove' },
  end: { name: 'mouseup' },
}

const MouseButton = {
  RightClick: 2,
}

export interface MouseSensorOptions extends AbstractPointerSensorOptions {}

export type MouseSensorProps = SensorProps<MouseSensorOptions>

export class MouseSensor extends AbstractPointerSensor {
  public constructor(props: MouseSensorProps) {
    super(props, events, getOwnerDocument(props.event.target))
  }

  public static activators = [
    {
      eventName: 'onMousedown' as const,
      handler: (event: MouseEvent, { onActivation }: MouseSensorOptions) => {
        if (event.button === MouseButton.RightClick) {
          return false
        }

        onActivation?.({ event })

        return true
      },
    },
  ]
}
