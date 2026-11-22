import Fs from 'fs/promises';
import path from 'path';

export type ThemeName = 'gading-light' | 'gading-dark';
export type ThemeTokens = Record<string, string>;

const GLOBALS_CSS = path.join(process.cwd(), 'src', 'designs', 'styles', 'globals.css');

/**
 * Read the hex tokens of both daisyUI themes straight from globals.css,
 * so the docs never drift from the real theme.
 */
export async function readThemeTokens(): Promise<Record<ThemeName, ThemeTokens>> {
  const css = await Fs.readFile(GLOBALS_CSS, 'utf8');
  const read = (name: ThemeName): ThemeTokens => {
    const start = css.indexOf(`name: "${name}"`);
    if (start < 0) throw new Error(`theme ${name} not found in globals.css`);
    const block = css.slice(start, css.indexOf('\n}', start));
    const tokens: ThemeTokens = {};
    for (const match of block.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)) {
      tokens[match[1]] = match[2].toUpperCase();
    }
    return tokens;
  };
  return { 'gading-light': read('gading-light'), 'gading-dark': read('gading-dark') };
}

function channel(value: number) {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

/** WCAG 2 relative luminance of a #RRGGBB colour */
export function luminance(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
}

/** WCAG 2 contrast ratio, 1 to 21 */
export function contrastRatio(fg: string, bg: string) {
  const [a, b] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
}

export type ContrastGrade = 'AAA' | 'AA' | 'AA large' | 'fail';

export function contrastGrade(ratio: number): ContrastGrade {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA large';
  return 'fail';
}
