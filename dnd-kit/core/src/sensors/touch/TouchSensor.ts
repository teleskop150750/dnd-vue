import type { PointerEventHandlers, PointerSensorOptions, PointerSensorProps } from '../pointer'
import { AbstractPointerSensor } from '../pointer'
import type { SensorProps } from '../types'

const events: PointerEventHandlers = {
  move: { name: 'touchmove' },
  end: { name: 'touchend' },
}

export interface TouchSensorOptions extends PointerSensorOptions {}

export type TouchSensorProps = SensorProps<TouchSensorOptions>

export class TouchSensor extends AbstractPointerSensor {
  public constructor(props: PointerSensorProps) {
    super(props, events)
  }

  public static activators = [
    {
      eventName: 'onTouchstart' as const,
      handler: (event: TouchEvent, { onActivation }: TouchSensorOptions) => {
        const { touches } = event

        if (touches.length > 1) {
          return false
        }

        onActivation?.({ event })

        return true
      },
    },
  ]

  public static setup() {
    // Добавление неперехватывающего и непассивного слушателя `touchmove`,
    // чтобы вызовы `event.preventDefault()` работали в обработчиках событий touchmove
    // добавленных динамически. Это необходимо для iOS Safari.
    window.addEventListener(events.move.name, noop, {
      capture: false,
      passive: false,
    })

    return function teardown() {
      window.removeEventListener(events.move.name, noop)
    }

    // We create a new handler because the teardown function of another sensor
    // could remove our event listener if we use a referentially equal listener.
    function noop() {}
  }
}
