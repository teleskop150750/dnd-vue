import { canUseDOM } from '@nado/dnd-kit-utilities'
import { watchEffect } from 'vue'

import type { SensorDescriptor } from '../../sensors'

// TODO проверить на реактивность sensors
export function useSensorSetup(sensors: Array<SensorDescriptor<any>>) {
  watchEffect((onCleanup) => {
    if (!canUseDOM) {
      return
    }

    const teardownFns = sensors.map(({ sensor }) => sensor.setup?.())

    onCleanup(() => {
      teardownFns.forEach((teardown) => teardown?.())
    })
  })
}
