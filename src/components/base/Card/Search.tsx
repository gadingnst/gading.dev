import { ChangeEventHandler, FunctionComponent, KeyboardEventHandler, useCallback, useState } from 'react';
import Button from '@/components/base/Button';
import Card from '@/components/base/Card';
import clsxm from '@/utils/helpers/clsxm';

export interface Props {
  className?: string;
  placeholder?: string;
  onSearch?: (keyword: string) => void;
}

const CardSearch: FunctionComponent<Props> = (props) => {
  const { className, placeholder, onSearch } = props;
  const [keyword, setKeyword] = useState('');

  const handleKeyword: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    const { target } = event;
    setKeyword(target.value);
  }, []);

  const handleSearch = useCallback(() => {
    onSearch?.(keyword);
  }, [keyword]);

  const handleTyping: KeyboardEventHandler<HTMLInputElement> = useCallback((event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  return (
    <Card
      className={clsxm(
        className,
        'flex w-full max-w-lg h-[60px] rounded-12 overflow-hidden px-12 py-8 shadow-md shadow-primary'
      )}
    >
      <input
        type="text"
        placeholder={placeholder}
        className="w-full h-full mr-4 dark:text-white bg-transparent"
        onChange={handleKeyword}
        onKeyDown={handleTyping}
      />
      <Button
        onClick={handleSearch}
        className="flex justify-center items-center bg-primary dark:bg-primary-2 text-sm ml-4 rounded-8 w-[120px]"
      >
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
