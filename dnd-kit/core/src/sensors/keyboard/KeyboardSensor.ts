/* eslint-disable unicorn/consistent-destructuring */
import {
  add as getAdjustedCoordinates,
  getOwnerDocument,
  getWindow,
  isKeyboardEvent,
  preventEvent,
  subtract as getCoordinatesDelta,
} from '@nado/dnd-kit-utilities'

import type { Coordinates } from '../../types'
import { defaultCoordinates, getScrollElementRect, getScrollPosition } from '../../utilities'
import { scrollIntoViewIfNeeded } from '../../utilities/scroll'
import { EventName } from '../events'
import type { Activators, SensorInstance, SensorOptions, SensorProps } from '../types'
import { Listeners } from '../utilities'
import { defaultKeyboardCodes, defaultKeyboardCoordinateGetter } from './defaults'
import type { KeyboardCodes, KeyboardCoordinateGetter } from './types'
import { KeyboardCode } from './types'

export interface KeyboardSensorOptions extends SensorOptions {
  keyboardCodes?: KeyboardCodes
  coordinateGetter?: KeyboardCoordinateGetter
  scrollBehavior?: ScrollBehavior
  onActivation?: ({ event }: { event: KeyboardEvent }) => void
}

export type KeyboardSensorProps = SensorProps<KeyboardSensorOptions>

export class KeyboardSensor implements SensorInstance {
  public autoScrollEnabled = false
  private referenceCoordinates: Coordinates | undefined
  private listeners: Listeners
  private windowListeners: Listeners

  public constructor(private props: KeyboardSensorProps) {
    const { event } = props
    const { target } = event

    this.props = props
    this.listeners = new Listeners(getOwnerDocument(target))
    this.windowListeners = new Listeners(getWindow(target))
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleCancel = this.handleCancel.bind(this)

    this.attach()
  }

  private attach() {
    this.handleStart()

    this.windowListeners.add(EventName.Resize, this.handleCancel)
    this.windowListeners.add(EventName.VisibilityChange, this.handleCancel)

    setTimeout(() => this.listeners.add(EventName.Keydown, this.handleKeyDown))
  }

  private handleStart() {
    const { activeNode, onStart } = this.props
    // TODO vue ref
    const node = activeNode.node.value

    if (node) {
      scrollIntoViewIfNeeded(node)
    }

    onStart(defaultCoordinates)
  }

  private handleKeyDown(event: Event) {
    if (isKeyboardEvent(event)) {
      const { active, context, options } = this.props
      const {
        keyboardCodes = defaultKeyboardCodes,
        coordinateGetter = defaultKeyboardCoordinateGetter,
        scrollBehavior = 'smooth',
      } = options
      const { code } = event

      if (keyboardCodes.end.includes(code)) {
        this.handleEnd(event)

        return
      }

      if (keyboardCodes.cancel.includes(code)) {
        this.handleCancel(event)

        return
      }

      const { collisionRect } = context.value
      const currentCoordinates = collisionRect ? { x: collisionRect.left, y: collisionRect.top } : defaultCoordinates

      if (!this.referenceCoordinates) {
        this.referenceCoordinates = currentCoordinates
      }

      const newCoordinates = coordinateGetter(event, {
        active,
        context: context.value,
        currentCoordinates,
      })

      if (newCoordinates) {
        const coordinatesDelta = getCoordinatesDelta(newCoordinates, currentCoordinates)
        const scrollDelta = {
          x: 0,
          y: 0,
        }
        const { scrollableAncestors } = context.value

        for (const scrollContainer of scrollableAncestors) {
          const direction = event.code
          const { isTop, isRight, isLeft, isBottom, maxScroll, minScroll } = getScrollPosition(scrollContainer)
          const scrollElementRect = getScrollElementRect(scrollContainer)

          const clampedCoordinates = {
            x: Math.min(
              direction === KeyboardCode.Right
                ? scrollElementRect.right - scrollElementRect.width / 2
                : scrollElementRect.right,
              Math.max(
                direction === KeyboardCode.Right
                  ? scrollElementRect.left
                  : scrollElementRect.left + scrollElementRect.width / 2,
                newCoordinates.x,
              ),
            ),
            y: Math.min(
              direction === KeyboardCode.Down
                ? scrollElementRect.bottom - scrollElementRect.height / 2
                : scrollElementRect.bottom,
              Math.max(
                direction === KeyboardCode.Down
                  ? scrollElementRect.top
                  : scrollElementRect.top + scrollElementRect.height / 2,
                newCoordinates.y,
              ),
            ),
          }

          const canScrollX =
            (direction === KeyboardCode.Right && !isRight) || (direction === KeyboardCode.Left && !isLeft)
          const canScrollY = (direction === KeyboardCode.Down && !isBottom) || (direction === KeyboardCode.Up && !isTop)

          if (canScrollX && clampedCoordinates.x !== newCoordinates.x) {
            const newScrollCoordinates = scrollContainer.scrollLeft + coordinatesDelta.x
            const canScrollToNewCoordinates =
              (direction === KeyboardCode.Right && newScrollCoordinates <= maxScroll.x) ||
              (direction === KeyboardCode.Left && newScrollCoordinates >= minScroll.x)

            if (canScrollToNewCoordinates && !coordinatesDelta.y) {
              // We don't need to update coordinates, the scroll adjustment alone will trigger
              // logic to auto-detect the new container we are over
              scrollContainer.scrollTo({
                left: newScrollCoordinates,
                behavior: scrollBehavior,
              })

              return
            }

            if (canScrollToNewCoordinates) {
              scrollDelta.x = scrollContainer.scrollLeft - newScrollCoordinates
            } else {
              scrollDelta.x =
                direction === KeyboardCode.Right
                  ? scrollContainer.scrollLeft - maxScroll.x
                  : scrollContainer.scrollLeft - minScroll.x
            }

            if (scrollDelta.x) {
              scrollContainer.scrollBy({
                left: -scrollDelta.x,
                behavior: scrollBehavior,
              })
            }

            break
          } else if (canScrollY && clampedCoordinates.y !== newCoordinates.y) {
            const newScrollCoordinates = scrollContainer.scrollTop + coordinatesDelta.y
            const canScrollToNewCoordinates =
              (direction === KeyboardCode.Down && newScrollCoordinates <= maxScroll.y) ||
              (direction === KeyboardCode.Up && newScrollCoordinates >= minScroll.y)

            if (canScrollToNewCoordinates && !coordinatesDelta.x) {
              // We don't need to update coordinates, the scroll adjustment alone will trigger
              // logic to auto-detect the new container we are over
              scrollContainer.scrollTo({
                top: newScrollCoordinates,
                behavior: scrollBehavior,
              })

              return
            }

            if (canScrollToNewCoordinates) {
              scrollDelta.y = scrollContainer.scrollTop - newScrollCoordinates
            } else {
              scrollDelta.y =
                direction === KeyboardCode.Down
                  ? scrollContainer.scrollTop - maxScroll.y
                  : scrollContainer.scrollTop - minScroll.y
            }

            if (scrollDelta.y) {
              scrollContainer.scrollBy({
                top: -scrollDelta.y,
                behavior: scrollBehavior,
              })
            }

            break
          }
        }

        this.handleMove(
          event,
          getAdjustedCoordinates(getCoordinatesDelta(newCoordinates, this.referenceCoordinates), scrollDelta),
        )
      }
    }
  }

  private handleMove(event: Event, coordinates: Coordinates) {
    const { onMove } = this.props

    preventEvent(event)
    onMove(coordinates)
  }

  private handleEnd(event: Event) {
    const { onEnd } = this.props

    preventEvent(event)
    this.detach()
    onEnd()
  }

  private handleCancel(event: Event) {
    const { onCancel } = this.props

    preventEvent(event)
    this.detach()
    onCancel()
  }

  private detach() {
    this.listeners.removeAll()
    this.windowListeners.removeAll()
  }

  public static activators: Activators<KeyboardSensorOptions> = [
    {
      eventName: 'onKeydown' as const,
      handler: (event: KeyboardEvent, { keyboardCodes = defaultKeyboardCodes, onActivation }, { active }) => {
        const { code } = event

        if (keyboardCodes.start.includes(code)) {
          const activator = active.activatorNode.value

          if (activator && event.target !== activator) {
            return false
          }

          preventEvent(event)

          onActivation?.({ event })

          return true
        }

        return false
      },
    },
  ]
}
