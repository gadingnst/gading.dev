import type { FunctionComponent, PropsWithChildren } from 'react';
import Card, { Props as CardProps } from '@/components/base/Card';
import clsxm from '@/utils/helpers/clsxm';

const CardHero: FunctionComponent<PropsWithChildren<CardProps>> = (props) => {
  const { className, children, ...cardProps } = props;
  return (
    <Card
      {...cardProps}
      className={clsxm(
        className,
        'shadow-xl max-w-5xl rounded-24 mx-auto -mt-80 dark:shadow-primary',
        'py-24 px-28',
        'sm:py-36 sm:px-40',
        'md:py-44 md:px-56',
      )}
    >
      {children}
    </Card>
  );
};

CardHero.defaultProps = {
  className: 'min-h-[500px]'
};

export default CardHero;
