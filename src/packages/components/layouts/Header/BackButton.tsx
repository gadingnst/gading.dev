'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import useBlogContentLanguages from '@/modules/Blog/hooks/useBlogContentLanguages';

export default function BackButton() {
  const router = useRouter();

  const { languagesCount } = useBlogContentLanguages();

  if (languagesCount < 1) return null;

  return (
    <button
      type="button"
      onClick={router.back}
      className="grid h-[38px] w-[38px] shrink-0 cursor-pointer place-items-center rounded-full floating-glass transition-transform duration-200 hover:scale-105"
      aria-label="Back"
    >
      <ChevronLeft className="h-[18px] w-[18px]" />
    </button>
  );
}
