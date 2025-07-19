'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import cn from '@/designs/utils/cn';
import useBlogContentLanguages from '@/modules/Blog/hooks/useBlogContentLanguages';

export default function BackButton() {
  const router = useRouter();

  const { languagesCount } = useBlogContentLanguages();

  if (languagesCount < 1) return null;

  return (
    <button
      onClick={router.back}
      className={cn([
        'liquid-glass-shadow btn btn-ghost btn-circle',
        'transition-all duration-300 hover:bg-white/80 hover:text-black hover:scale-105'
      ])}
      aria-label="Back"
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
  );
}
