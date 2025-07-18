'use client';

import { AUTHOR_NAME } from '@/configs/author';
import cn from '@/designs/utils/cn';
import Image from '@/packages/components/base/Displays/Image';
import ButtonLink from '@/packages/components/base/Navigations/ButtonLink';
import useAppTheme from '@/packages/libs/AppTheme/useAppTheme';

function ProfileInfo() {
  const { isDark } = useAppTheme();
  return (
    <div>
      <div className="relative flex flex-col md:flex-row justify-around items-center gap-8 md:gap-0 mb-6 md:mb-8 md:-mx-9">
        <div className="flex w-full md:w-1/4 flex-row justify-start items-center gap-4 order-2 md:order-1">
          <ButtonLink href="/portfolio" variant="outline">
            Portfolio
          </ButtonLink>
          <ButtonLink href="/profile" variant="outline">
            Profile
          </ButtonLink>
        </div>
        <div className="order-1 md:order-2">
          <Image
            className="rounded-full max-w-[180px] max-h-[180px] cursor-grab active:cursor-grabbing"
            src="/media/authors/gading-talks.jpeg"
            alt={AUTHOR_NAME}
            width={180}
            height={180}
            delayLoad={750}
            wrapperClassName={cn([
              '-mt-24 rounded-full overflow-hidden transition-all shadow-lg',
              'hover:shadow-xl hover:-translate-y-3',
              'active:shadow-md active:scale-95',
              isDark && 'hover:shadow-accent'
            ])}
          />
        </div>
        <div className="flex w-full md:w-1/4 flex-row justify-end items-center gap-4 order-3 md:order-3">
          <ButtonLink href="/resume" variant="outline" external>
            Resume
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Contact
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
