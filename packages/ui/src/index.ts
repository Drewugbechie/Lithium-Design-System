/** Join conditional class names without introducing a runtime dependency. */
export function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ')
}
