'use client';

import Script, { ScriptProps } from 'next/script';
import { useId } from 'react';

/**
 * handle Twitter embed for SPA
 * @see https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/guides/scripting-loading-and-initialization
 */
function TwitterScript(props: ScriptProps) {
  const scriptId = useId();
  return (
    <Script
      async
      defer
      {...props}
      id={scriptId}
      src="https://platform.twitter.com/widgets.js"
    />
  );
};

export default TwitterScript;
