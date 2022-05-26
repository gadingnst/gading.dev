import { Fragment, FunctionComponent, useCallback } from 'react';
import clsxm from '@/utils/helpers/clsxm';
import useAppTheme from '@/hooks/stores/useAppTheme';

export interface Props {
  className?: string;
  size?: number;
}

const SwitchTheme: FunctionComponent<Props> = (props) => {
  const { size, className } = props;
  const [theme, setTheme] = useAppTheme();

  const onChangeTheme = useCallback(() => {
    setTheme(theme.next);
  }, [theme]);

  const Icon = theme.current === 'light'
    ? <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    : (
      <Fragment>
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </Fragment>
    );

  return (
    <span className={clsxm('cursor-pointer text-white dark:text-white', className)} onClick={onChangeTheme}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {Icon}
      </svg>
    </span>
  );
};

SwitchTheme.defaultProps = {
  size: 24,
  className: ''
};

export default SwitchTheme;
