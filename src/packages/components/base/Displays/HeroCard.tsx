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
        'py-6 px-7',
        'sm:py-9 sm:px-10',
        'md:py-11 md:px-14',
        'min-h-[500px]',
        className
      ])}
    >
      {children}
    </Card>
  );
};

export default HeroCard;
