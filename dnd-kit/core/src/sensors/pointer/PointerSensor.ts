import { getOwnerDocument } from '@nado/dnd-kit-utilities'

import type { SensorProps } from '../types'
import type { AbstractPointerSensorOptions, PointerEventHandlers } from './AbstractPointerSensor'
import { AbstractPointerSensor } from './AbstractPointerSensor'

const events: PointerEventHandlers = {
  move: { name: 'pointermove' },
  end: { name: 'pointerup' },
}

export interface PointerSensorOptions extends AbstractPointerSensorOptions {}

export type PointerSensorProps = SensorProps<PointerSensorOptions>

export class PointerSensor extends AbstractPointerSensor {
  public constructor(props: PointerSensorProps) {
    // События указателя перестают срабатывать, если цель размонтирована во время перетаскивания
    // Поэтому вместо этого мы присоединяем слушателей к документу-владельцу
    super(props, events, getOwnerDocument(props.event.target))
  }

  public static activators = [
    {
      eventName: 'onPointerdown' as const,
      handler: (event: PointerEvent, { onActivation }: PointerSensorOptions) => {
        if (!event.isPrimary || event.button !== 0) {
          return false
        }

        onActivation?.({ event })

        return true
      },
    },
  ]
}
