import type { Element, ElementContent, Root } from 'hast';
import { Fragment, ReactNode } from 'react';
import { refractor } from 'refractor';
import tsx from 'refractor/lang/tsx.js';

/** tsx is not in refractor's common set (typescript, yaml and markdown are) */
if (!refractor.registered('tsx')) refractor.register(tsx);

export type SnippetLang = 'ts' | 'tsx' | 'yaml' | 'markdown';

const GRAMMAR: Record<SnippetLang, string> = {
  ts: 'typescript',
  tsx: 'tsx',
  yaml: 'yaml',
  markdown: 'markdown'
};

function toClassName(value: unknown): string | undefined {
  if (Array.isArray(value)) return value.join(' ');
  return typeof value === 'string' ? value : undefined;
}

function renderNode(node: ElementContent, key: number): ReactNode {
  if (node.type === 'text') return node.value;
  if (node.type !== 'element') return null;
  const el = node as Element;
  return (
    <span key={key} className={toClassName(el.properties?.className)}>
      {el.children.map(renderNode)}
    </span>
  );
}

/**
 * Highlights code with refractor (the Prism behind rehype-prism-plus), on the
 * server, into token spans that prism.css already colours.
 */
export function highlight(code: string, lang: SnippetLang): ReactNode {
  const tree: Root = refractor.highlight(code, GRAMMAR[lang]);
  return <Fragment>{tree.children.map((node, i) => renderNode(node as ElementContent, i))}</Fragment>;
}

export function languageClass(lang: SnippetLang): string {
  return `language-${GRAMMAR[lang]}`;
}
