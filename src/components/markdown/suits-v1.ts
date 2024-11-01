const suitV1EmojisById = {
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

export type SuitV1Emoji =
  (typeof suitV1EmojisById)[keyof typeof suitV1EmojisById]
export type SuitV1Id = keyof typeof suitV1EmojisById

export const suitV1Emojis = Object.values(
  suitV1EmojisById
) as readonly SuitV1Emoji[]
export const suitV1Ids = Object.keys(suitV1EmojisById).map(
  Number
) as readonly SuitV1Id[]

export function isSuitV1Emoji(text: string): text is SuitV1Emoji {
  return (suitV1Emojis as readonly string[]).includes(text)
}

export function getEmojiBySuitV1Id(suitId: SuitV1Id): SuitV1Emoji {
  return suitV1EmojisById[suitId]
}

export function getSuitV1IdByEmoji(emoji: SuitV1Emoji): SuitV1Id | undefined {
  return Object.entries(suitV1EmojisById).find(([_, e]) => e === emoji)?.[0] as
    | SuitV1Id
    | undefined
}

// Suit colors ---------------------------------------------------------------

const suitV1ColorsById = {
  1: 'red',
  2: 'blue',
  3: 'green',
  4: 'yellow',
  5: 'black',
  6: 'rainbow',
} as const

export const suitV1Colors = [
  ...Object.values(suitV1ColorsById),
  'orange',
  'purple',
  'white',
  'pink',
  'cyan',
  'brown',
  'gray',
] as const

export type SuitV1Color = (typeof suitV1Colors)[number]
export type SuitV1ColorId = keyof typeof suitV1ColorsById

export function isSuitV1Color(text: string): text is SuitV1Color {
  return (suitV1Colors as readonly string[]).includes(text)
}

export function getColorBySuitV1Id(suitId: SuitV1ColorId): SuitV1Color {
  return suitV1ColorsById[suitId]
}

export function getSuitV1IdByColor(
  color: SuitV1Color
): SuitV1ColorId | undefined {
  return Object.entries(suitV1ColorsById).find(([_, e]) => e === color)?.[0] as
    | SuitV1ColorId
    | undefined
}

// Shape suits ---------------------------------------------------------------

export const shapeSuitV1EmojisById = {
  heart: '🖤',
  circle: '⚫️',
  square: '⬛️',
  rainbow: '🌈',
} as const

export type ShapeSuitV1Id = keyof typeof shapeSuitV1EmojisById
export type ShapeSuitV1Emoji =
  (typeof shapeSuitV1EmojisById)[keyof typeof shapeSuitV1EmojisById]

export const shapeSuitV1Ids = Object.keys(
  shapeSuitV1EmojisById
) as readonly ShapeSuitV1Id[]

export function getShapeSuitV1EmojiById(
  suitId: ShapeSuitV1Id
): ShapeSuitV1Emoji {
  return shapeSuitV1EmojisById[suitId]
}
