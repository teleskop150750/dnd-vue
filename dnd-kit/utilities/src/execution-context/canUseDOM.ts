import { isNil } from '../is'

// https://github.com/facebook/react/blob/master/packages/shared/ExecutionEnvironment.js
export const canUseDOM = !!(!isNil(window) && !isNil(window.document) && !isNil(window.document.createElement))
