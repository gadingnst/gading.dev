import type { PropsWithChildren } from 'react';

import cn from '@/designs/utils/cn';

import Card, { CardProps } from './Card';

function HeroCard(_props: PropsWithChildren<CardProps>) {
  const {
    className,
    children,
    ...cardProps
  }  = _props;
  return (
    <Card
      {...cardProps}
      className={cn([
        'base-container card-body shadow-xl rounded-3xl mx-auto',
        'py-2',
        'sm:py-6 sm:px-8!',
        'md:px-10!',
        'min-h-[500px]',
        className
      ])}
    >
      {children}
    </Card>
  );
};

export default HeroCard;
