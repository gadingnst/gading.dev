import { FunctionComponent, useCallback, useMemo } from 'react';
import SVG from '@/components/base/Image/SVG';
import clsxm from '@/utils/helpers/clsxm';
import useAppTheme from '@/hooks/stores/useAppTheme';

import IconCrescent from '$/assets/icons/tools/crescent.svg';
import IconSun from '$/assets/icons/tools/sun.svg';

export interface Props {
  className?: string;
  size?: number;
}

const SwitchTheme: FunctionComponent<Props> = (props) => {
  const { size, className } = props;
  const [theme, setTheme] = useAppTheme();

  const onChangeTheme = useCallback(() => {
    setTheme(theme.next);
  }, [theme.next]);

  const Icon = useMemo(() => {
    if (theme.current === 'light') {
      return IconCrescent;
    }
    return IconSun;
  }, [theme.current]);

  return (
    <span className={clsxm('cursor-pointer text-white dark:text-white', className)} onClick={onChangeTheme}>
      <SVG
        className="transition-transform active:scale-50"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        src={Icon}
        width={size}
        height={size}
      />
    </span>
  );
};

SwitchTheme.defaultProps = {
  size: 24,
  className: ''
};

export default SwitchTheme;
