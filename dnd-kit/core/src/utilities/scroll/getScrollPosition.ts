import { isDocumentScrollingElement } from './documentScrollingElement'

interface ScrollPosition {
  isTop: boolean
  isLeft: boolean
  isBottom: boolean
  isRight: boolean
  maxScroll: {
    x: number
    y: number
  }
  minScroll: {
    x: number
    y: number
  }
}

/**
 * Возвращает объект с информацией о текущем положении прокрутки элемента-контейнера.
 *
 * @param {Element} scrollingContainer - Элемент-контейнер, для которого нужно определить положение прокрутки.
 * @returns {ScrollPosition} Объект с информацией о текущем положении прокрутки, включая:
 * - isTop: {boolean} - true, если контейнер прокручен до верхнего края, иначе false.
 * - isLeft: {boolean} - true, если контейнер прокручен до левого края, иначе false.
 * - isBottom: {boolean} - true, если контейнер прокручен до нижнего края, иначе false.
 * - isRight: {boolean} - true, если контейнер прокручен до правого края, иначе false.
 * - maxScroll: {object} - объект с максимальными значениями прокрутки по осям X и Y.
 * - minScroll: {object} - объект с минимальными значениями прокрутки по осям X и Y.
 */
export function getScrollPosition(scrollingContainer: Element): ScrollPosition {
  const minScroll = {
    x: 0,
    y: 0,
  }

  const dimensions = isDocumentScrollingElement(scrollingContainer)
    ? {
        height: window.innerHeight,
        width: window.innerWidth,
      }
    : {
        height: scrollingContainer.clientHeight,
        width: scrollingContainer.clientWidth,
      }

  const maxScroll = {
    x: scrollingContainer.scrollWidth - dimensions.width,
    y: scrollingContainer.scrollHeight - dimensions.height,
  }

  const isTop = scrollingContainer.scrollTop <= minScroll.y
  const isLeft = scrollingContainer.scrollLeft <= minScroll.x
  const isBottom = scrollingContainer.scrollTop >= maxScroll.y
  const isRight = scrollingContainer.scrollLeft >= maxScroll.x

  return {
    isTop,
    isLeft,
    isBottom,
    isRight,
    maxScroll,
    minScroll,
  }
}
