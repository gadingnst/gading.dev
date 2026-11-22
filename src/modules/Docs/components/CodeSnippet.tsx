interface Props {
  /** repo path the lines come from, shown as the title */
  file: string;
  code: string;
}

/**
 * A short excerpt of real repo code. Plain text on the terminal surface:
 * the MDX code blocks get Prism at build time, docs snippets do not need it.
 */
function CodeSnippet({ file, code }: Props) {
  return (
    <figure className="overflow-hidden rounded-2xl bg-terminal shadow-soft">
      <figcaption className="border-b border-white/10 px-4 py-2.5 font-mono text-xs text-[#A89C8E]">
        {file}
      </figcaption>
      <pre className="m-0 overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-[1.7] text-[#F3ECE2]">
        <code>{code.trim()}</code>
      </pre>
    </figure>
  );
}

export default CodeSnippet;
