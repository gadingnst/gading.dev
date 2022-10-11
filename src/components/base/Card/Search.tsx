import type { FunctionComponent } from 'react';
import Button from '@/components/base/Button';
import Card from '@/components/base/Card';
import clsxm from '@/utils/helpers/clsxm';

export interface Props {
  className?: string;
  placeholder?: string;
}

const CardSearch: FunctionComponent<Props> = (props) => {
  const { className, placeholder } = props;
  return (
    <Card
      className={clsxm(
        className,
        'flex w-full max-w-lg h-[60px] rounded-12 overflow-hidden px-12 py-8'
      )}
    >
      <input
        type="text"
        placeholder={placeholder}
        className="w-full h-full mr-4 dark:text-white bg-transparent"
      />
      <Button className="flex justify-center items-center bg-primary dark:bg-primary-2 text-sm ml-4 rounded-8 w-[120px]">
        Search
      </Button>
    </Card>
  );
};

CardSearch.defaultProps = {
  className: '',
  placeholder: ''
};

export default CardSearch;
