import { Fragment } from 'react';

interface EmphasisProps {
  /** plain text where `**word**` marks the parts to emphasise */
  text: string;
}

/**
 * Renders locale strings with `**bold**` spans, so a sentence stays one
 * translatable string instead of being cut into fragments.
 */
function Emphasis({ text }: EmphasisProps) {
  return (
    <>
      {text.split('**').map((part, index) => (
        // odd indexes sit between a pair of `**`
        <Fragment key={index}>
          {index % 2 === 1 ? <b className="font-semibold text-base-content">{part}</b> : part}
        </Fragment>
      ))}
    </>
  );
}

export default Emphasis;
