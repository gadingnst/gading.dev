import { Fragment } from 'react';

interface EmphasisProps {
  /** plain text where `**word**` marks a bold part and `[word](url)` a link */
  text: string;
}

const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/;
const LINK = /^\[([^\]]+)\]\(([^)\s]+)\)$/;

/**
 * Renders locale strings with `**bold**` spans and `[label](url)` links, so a
 * sentence stays one translatable string instead of being cut into fragments.
 */
function Emphasis({ text }: EmphasisProps) {
  return (
    <>
      {text.split(TOKEN).map((part, index) => {
        const link = part.match(LINK);
        if (link) {
          return (
            <a
              key={index}
              href={link[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-base-content underline decoration-1 underline-offset-4 transition-colors hover:text-brand"
            >
              {link[1]}
            </a>
          );
        }
        if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
          return <b key={index} className="font-semibold text-base-content">{part.slice(2, -2)}</b>;
        }
        return <Fragment key={index}>{part}</Fragment>;
      })}
    </>
  );
}

export default Emphasis;
