'use client';

import { type PropsWithChildren, useState } from 'react';
import useMounted from '@/packages/hooks/useMounted';

function BrowserRender({ children }: PropsWithChildren) {
  const [onClient, setOnClient] = useState(false);

  useMounted(() => {
    setOnClient(true);
  });

  return onClient ? children : null;
}

export default BrowserRender;
