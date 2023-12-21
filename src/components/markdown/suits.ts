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
