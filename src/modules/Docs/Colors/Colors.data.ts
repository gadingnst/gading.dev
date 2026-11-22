/** the soft tokens of globals.css (`--gd-*`), with the Tailwind name each is exposed as */
export const SOFT_TOKENS = [
  { token: 'gd-card', utility: 'bg-card' },
  { token: 'gd-line', utility: 'border-line' },
  { token: 'gd-muted', utility: 'text-muted' },
  { token: 'gd-brand-soft', utility: 'bg-brand-soft' },
  { token: 'gd-teal', utility: 'text-teal' },
  { token: 'gd-teal-soft', utility: 'bg-teal-soft' },
  { token: 'gd-rose', utility: 'text-rose' },
  { token: 'gd-rose-soft', utility: 'bg-rose-soft' },
  { token: 'gd-lilac', utility: 'text-lilac' },
  { token: 'gd-lilac-soft', utility: 'bg-lilac-soft' },
  { token: 'gd-terminal', utility: 'bg-terminal' }
] as const;

/** the daisyUI tokens worth comparing side by side */
export const BASE_TOKENS = [
  'color-base-100',
  'color-base-200',
  'color-base-300',
  'color-base-content',
  'color-primary',
  'color-secondary',
  'color-accent',
  'color-error'
] as const;

/**
 * Text-on-background pairs that the site really uses. `fg`/`bg` are token names;
 * `fixedFg` is a literal colour for text that is not a token (the terminal text).
 */
export const CONTRAST_PAIRS: { label: string; fg: string; bg: string; fixedFg?: string }[] = [
  { label: 'body text on page', fg: 'color-base-content', bg: 'color-base-100' },
  { label: 'body text on card', fg: 'color-base-content', bg: 'gd-card' },
  { label: 'muted text on page', fg: 'gd-muted', bg: 'color-base-100' },
  { label: 'muted text on card', fg: 'gd-muted', bg: 'gd-card' },
  { label: 'brand link on page', fg: 'color-primary', bg: 'color-base-100' },
  { label: 'button text on primary', fg: 'color-primary-content', bg: 'color-primary' },
  { label: 'text on secondary', fg: 'color-secondary-content', bg: 'color-secondary' },
  { label: 'text on accent', fg: 'color-accent-content', bg: 'color-accent' },
  { label: 'teal tag', fg: 'gd-teal', bg: 'gd-teal-soft' },
  { label: 'lilac tag', fg: 'gd-lilac', bg: 'gd-lilac-soft' },
  { label: 'rose note', fg: 'gd-rose', bg: 'gd-rose-soft' },
  { label: 'body text on rose-soft', fg: 'color-base-content', bg: 'gd-rose-soft' },
  { label: 'body text on brand-soft', fg: 'color-base-content', bg: 'gd-brand-soft' },
  { label: 'terminal text #F3ECE2', fg: 'terminal-text', bg: 'gd-terminal', fixedFg: '#F3ECE2' }
];
