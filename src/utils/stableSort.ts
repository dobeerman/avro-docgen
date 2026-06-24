export function stableSort<T>(items: readonly T[], keySelector: (item: T) => string): T[] {
  return [...items].sort((left, right) => keySelector(left).localeCompare(keySelector(right)));
}
