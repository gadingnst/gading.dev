/**
 * Truncates text to a maximum number of words and appends ellipsis if needed
 * @param text The text to truncate
 * @param maxWords Maximum number of words to display
 * @param ellipsis The string to append when text is truncated (default: '...')
 * @returns Truncated text with ellipsis if needed
 */
export function truncateWords(text: string, maxWords: number, ellipsis = '...'): string {
  if (!text) return '';

  const words = text.trim().split(/\s+/);

  if (words.length <= maxWords) {
    return text;
  }

  return words.slice(0, maxWords).join(' ') + ellipsis;
}

export function dasherize(input: string): string {
  return input.replace(/\s+/g, '-').toLowerCase();
}
