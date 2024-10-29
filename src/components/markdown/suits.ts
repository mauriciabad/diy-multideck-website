const suitEmojisById = {
  0: '🔥',
  1: '💧',
  2: '⭐',
  3: '☘️',
  4: '🍊',
  5: '🍆',
  6: '💭',
  7: '🕷️',
  8: '🌸',
  9: '💎',
  10: '💩',
  11: '🌈',
  A00: '❤️',
  A10: '🔴',
  A20: '🟥',
  A01: '💙',
  A11: '🔵',
  A21: '🟦',
  A02: '💛',
  A12: '🟡',
  A22: '🟨',
  A03: '💚',
  A13: '🟢',
  A23: '🟩',
  A04: '🖤',
  A14: '⚫️',
  A24: '🔲',
  'A24-alt': '⬛️',
  A05: '🤍',
  A15: '⚪️',
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

export const suitColors = [
  'textured-red',
  'textured-blue',
  'textured-green',
  'textured-yellow',
  'textured-black',
  'textured-white',
  'red',
  'blue',
  'green',
  'yellow',
  'orange',
  'purple',
  'white',
  'black',
  'pink',
  'cyan',
  'brown',
  'rainbow',
] as const

export type SuitColor = (typeof suitColors)[number]

export function isSuitColor(text: string): text is SuitColor {
  return (suitColors as readonly string[]).includes(text)
}

// Shape suits ---------------------------------------------------------------

export const shapeSuitEmojisById = {
  heart: '🖤',
  circle: '⚫️',
  square: '⬛️',
} as const

export type ShapeSuitId = keyof typeof shapeSuitEmojisById
export type ShapeSuitEmoji =
  (typeof shapeSuitEmojisById)[keyof typeof shapeSuitEmojisById]

export const shapeSuitIds = Object.keys(
  shapeSuitEmojisById
) as readonly ShapeSuitId[]

export function isSuitShape(text: string): text is ShapeSuitId {
  return text in shapeSuitEmojisById
}

export function getShapeSuitEmojiById(suitId: ShapeSuitId): ShapeSuitEmoji {
  return shapeSuitEmojisById[suitId]
}
