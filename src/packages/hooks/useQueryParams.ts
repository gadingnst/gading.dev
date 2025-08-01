import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

function useQueryParams() {
  const queryReader = useSearchParams();

  const queryModifier = useMemo(() => {
    return new URLSearchParams(queryReader?.toString());
  }, [queryReader]);

  return { queryReader, queryModifier };
}

export default useQueryParams;
