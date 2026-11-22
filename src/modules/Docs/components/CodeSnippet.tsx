import { highlight, languageClass, SnippetLang } from '@/modules/Docs/components/highlight';

interface Props {
  /** repo path the lines come from, shown as the title */
  file: string;
  code: string;
  /** grammar for the Prism tokens */
  lang: SnippetLang;
}

/**
 * A short excerpt of real repo code on the terminal surface, highlighted on
 * the server with the same Prism tokens and colours as the blog posts.
 */
function CodeSnippet({ file, code, lang }: Props) {
  const langClass = languageClass(lang);
  return (
    <figure className="overflow-hidden rounded-2xl bg-terminal shadow-soft">
      <figcaption className="border-b border-white/10 px-4 py-2.5 font-mono text-xs text-[#A89C8E]">
        {file}
      </figcaption>
      <pre
        style={{ background: 'transparent', borderRadius: 0 }}
        className="docs-code-scroll m-0 overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-[1.7] text-[#F3ECE2]"
      >
        <code
          className={`code-highlight ${langClass}`}
          style={{ display: 'block', background: 'transparent', fontSize: 'inherit', lineHeight: 'inherit' }}
        >
          {highlight(code.trim(), lang)}
        </code>
      </pre>
    </figure>
  );
}

export default CodeSnippet;
