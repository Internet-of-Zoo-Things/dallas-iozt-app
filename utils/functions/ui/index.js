/* eslint-disable no-bitwise */
/**
 * Import / Export helper functions here
 */

export * from './usePrevious'

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const hashCode = (str) => {
  let hash = 0
  let chr

  if (str.length === 0) return hash

  for (let i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + chr
    hash |= 0 // Convert to 32bit integer
  }

  return hash
}

export function generateColorObj(str) {
  const hash = hashCode(str)
  const r = (hash & 0xFF0000) >> 16
  const g = (hash & 0x00FF00) >> 8
  const b = hash & 0x0000FF

  return { r, g, b }
}

export function generateColorStr(str) {
  const tmp = generateColorObj(str)
  return `rgb(${tmp.r}, ${tmp.g}, ${tmp.b})`
}
