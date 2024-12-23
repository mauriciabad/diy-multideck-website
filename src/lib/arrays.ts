/**
 * Inserts the delimiter between each element of an iterable.
 *
 * @example
 * ```
 * insertBetweenIterable([1, 2, 3], ',') //=> [1, ',', 2, ',', 3]
 * ```
 *
 * @param iterable - The iterable to insert the delimiter between.
 * @param delimiter - The delimiter to insert between elements.
 * @returns An iterator that yields each element and then the delimiter.
 */
export function* insertBetweenIterable<T, D>(iterable: T[], delimiter: D) {
  let first = true
  for (const item of iterable) {
    if (!first) yield delimiter
    first = false
    yield item
  }
}

/**
 * Inserts the delimiter between each element of the array.
 *
 * @example
 * ```
 * insertBetween([1, 2, 3], ',') //=> [1, ',', 2, ',', 3]
 * ```
 *
 * @param array - The array to insert the delimiter between.
 * @param delimiter - The delimiter to insert between elements.
 * @returns A new array with the delimiter inserted between each element.
 */
export function insertBetween<T, D>(array: T[], delimiter: D) {
  return Array.from(insertBetweenIterable(array, delimiter))
}
