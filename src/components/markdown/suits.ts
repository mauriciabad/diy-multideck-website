const suitEmojisById = {
  0: '🔥',
  1: '💧',
  2: '⭐',
  3: '🍀',
  4: '🍊',
  5: '🍆',
  6: '💭',
  7: '🕷️',
  8: '🌸',
  9: '💎',
  10: '💩',
  11: '🗿',
  111: '❤️',
  121: '🔴',
  131: '🟥',
  112: '💙',
  122: '🔵',
  132: '🟦',
  113: '💛',
  123: '🟡',
  133: '🟨',
  114: '💚',
  124: '🟢',
  134: '🟩',
  115: '🖤',
  125: '⚫️',
  135: '⬛️',
  145: '🌈',
} as const

export type SuitEmoji = (typeof suitEmojisById)[keyof typeof suitEmojisById]
export type SuitId = keyof typeof suitEmojisById

export const suitEmojis = Object.values(suitEmojisById) as readonly SuitEmoji[]
export const suitIds = Object.keys(suitEmojisById).map(
  Number
) as readonly SuitId[]

export function isSuitEmoji(text: string): text is SuitEmoji {
  return (suitEmojis as readonly string[]).includes(text)
}

export function getEmojiBySuitId(suitId: SuitId): SuitEmoji {
  return suitEmojisById[suitId]
}

export function getSuitIdByEmoji(emoji: SuitEmoji): SuitId | undefined {
  return Object.entries(suitEmojisById).find(([_, e]) => e === emoji)?.[0] as
    | SuitId
    | undefined
}

// Suit colors ---------------------------------------------------------------

const suitColorsById = {
  1: 'red',
  2: 'blue',
  3: 'green',
  4: 'yellow',
  5: 'black',
  6: 'rainbow',
} as const

export const suitColors = [
  ...Object.values(suitColorsById),
  'orange',
  'purple',
  'white',
  'pink',
  'cyan',
  'brown',
  'gray',
] as const

export type SuitColor = (typeof suitColors)[number]
export type SuitColorId = keyof typeof suitColorsById

export function isSuitColor(text: string): text is SuitColor {
  return (suitColors as readonly string[]).includes(text)
}

export function getColorBySuitId(suitId: SuitColorId): SuitColor {
  return suitColorsById[suitId]
}

export function getSuitIdByColor(color: SuitColor): SuitColorId | undefined {
  return Object.entries(suitColorsById).find(([_, e]) => e === color)?.[0] as
    | SuitColorId
    | undefined
}

// Shape suits ---------------------------------------------------------------

export const shapeSuitEmojisById = {
  heart: '🖤',
  circle: '⚫️',
  square: '⬛️',
  rainbow: '🌈',
} as const

export type ShapeSuitId = keyof typeof shapeSuitEmojisById
export type ShapeSuitEmoji =
  (typeof shapeSuitEmojisById)[keyof typeof shapeSuitEmojisById]

export const shapeSuitIds = Object.keys(
  shapeSuitEmojisById
) as readonly ShapeSuitId[]

export function getShapeSuitEmojiById(suitId: ShapeSuitId): ShapeSuitEmoji {
  return shapeSuitEmojisById[suitId]
}
