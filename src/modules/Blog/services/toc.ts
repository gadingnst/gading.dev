import GithubSlugger from 'github-slugger';

export interface TocItem {
  id: string;
  text: string;
  depth: 2 | 3;
}

/** strip inline markdown so the text matches what rehype-slug sees in the rendered heading */
function toPlainText(raw: string): string {
  return raw
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/[`*_~]/g, '')
    .trim();
}

/**
 * Build a table of contents from the h2 and h3 headings of an MDX source.
 * Ids are slugged in document order over every heading, the same way rehype-slug does.
 * @param source - MDX body without frontmatter
 */
export function getTableOfContents(source: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inFence = false;
  for (const line of source.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;
    const depth = match[1].length;
    const text = toPlainText(match[2]);
    const id = slugger.slug(text);
    if (depth === 2 || depth === 3) {
      items.push({ id, text, depth });
    }
  }
  return items;
}
