const compatibilities = {
  0: 'Incompatible',
  1: 'Very bad',
  2: 'Bad',
  3: 'Good',
  4: 'Very good',
  5: 'Exelent',
} as const

export const getCompatibility = (
  value: number
): (typeof compatibilities)[keyof typeof compatibilities] | null => {
  if (
    value !== 0 &&
    value !== 1 &&
    value !== 2 &&
    value !== 3 &&
    value !== 4 &&
    value !== 5
  )
    return null
  return compatibilities[value]
}