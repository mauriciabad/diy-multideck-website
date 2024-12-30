import type { GameMappingIconSchema } from '../schemas/gameMappingsSchema'

export const COLOR_MAPPINGS = {
  red: '#f44336',
  blue: '#1d89f3',
  green: '#15b550',
  yellow: '#e8bd00',
  orange: '#ff8e00',
  purple: '#8F4EFF',
  white: '#fefefe',
  black: '#424242',
  pink: '#ff77c4',
  cyan: '#12cdd4',
  brown: '#b79664',
} as const

export function iconTransformToCss(
  transform: GameMappingIconSchema['transform']
) {
  if (!transform) return undefined
  return (
    [
      transform.scale ? `scale(${transform.scale})` : null,
      transform.translateX
        ? `translateX(${transform.translateX * 100}%)`
        : null,
      transform.translateY
        ? `translateY(${transform.translateY * 100}%)`
        : null,
      transform.rotate ? `rotate(${transform.rotate}deg)` : null,
    ]
      .filter((value) => value !== null)
      .join(' ') || undefined
  )
}

export function translateColor(fill: string | undefined) {
  if (!fill) return undefined
  return COLOR_MAPPINGS[fill as keyof typeof COLOR_MAPPINGS] ?? fill
}
