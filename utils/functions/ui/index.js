/**
 * Import / Export helper functions here
 */

export * from './usePrevious'

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
