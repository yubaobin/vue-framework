/**
 * 公共getters
 */

export const nameWithTime = state => {
  const date = new Date()
  const time = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  return `${state.appName} ${time}`
}

export const positionX = state => `${state.x}px`
