const compatibilities = {
  0: 'Unplayable',
  1: 'Bad',
  2: 'Good',
  3: 'Great',
  4: 'Exellent',
  5: 'Perfect',
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
