'use client';

import { AUTHOR_NAME } from '@/configs/author';
import cn from '@/designs/utils/cn';
import Image from '@/packages/components/base/Displays/Image';
import ButtonLink from '@/packages/components/base/Navigations/ButtonLink';
import useAppTheme from '@/packages/libs/AppTheme/useAppTheme';

function ProfileInfo() {
  const { isDark } = useAppTheme();

  const LeftDesc = ({ className }: { className?: string }) => (
    <div
      className={cn([
        'items-center h-[30px] flex-1 justify-center text-center',
        className
      ])}
    >
      <ButtonLink href="/portfolio" variant="outline">
        Portfolio
      </ButtonLink>
      <ButtonLink href="/profile" variant="outline" className="ml-4">
        Profile
      </ButtonLink>
    </div>
  );

  const RightDesc = ({ className }: { className?: string }) => (
    <div
      className={cn([
        'items-center h-[30px] flex-1 justify-center',
        className
      ])}
    >
      <ButtonLink href="/resume" variant="outline" external>
        Resume
      </ButtonLink>
      <ButtonLink href="mailto:contact@gading.dev" variant="outline" className="ml-4">
        Contact
      </ButtonLink>
    </div>
  );

  return (
    <div>
      <div className="relative flex justify-around items-start md:-mx-9">
        <LeftDesc className="hidden md:flex" />
        <div className="-mt-4 flex flex-col flex-1 items-center justify-center">
          <Image
            className="rounded-full cursor-grab active:cursor-grabbing"
            src="/media/authors/gading-talks.jpeg"
            alt={AUTHOR_NAME}
            width={180}
            height={180}
            wrapperClassName={cn([
              '-mt-24 rounded-full overflow-hidden transition-all shadow-lg',
              'hover:shadow-xl hover:-translate-y-3',
              'active:shadow-md active:scale-95',
              'min-w-[180px] min-h-[180px] max-w-[180px] max-h-[180px]',
              isDark && 'hover:shadow-accent'
            ])}
          />
          <h3 className="text-center text-2xl font-bold mb-9 mt-4">
            <span className={cn('hover:cursor-pointer hover:underline underline-offset-4', isDark ? 'text-accent' : 'text-primary')}>Gading</span> Nasution
          </h3>
        </div>
        <RightDesc className="hidden md:flex" />
      </div>
      <div className="md:hidden -translate-y-8">
        <div className="mb-8 sm:-mt-16">
          <RightDesc className="flex h-[auto] justify-around sm:justify-between sm:px-8 mb-8" />
          <LeftDesc className="flex h-[auto] justify-around" />
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
