import { FunctionComponent, PropsWithChildren, ReactNode, useCallback, useMemo, useRef } from 'react';
import { getChildrenByType } from 'react-nanny/lib/es5/getChildrenByType';
import Button from '@/components/base/Button';
import SVG from '@/components/base/Image/SVG';
import clsxm from '@/utils/helpers/clsxm';
import IconCaretDown from '$/assets/icons/tools/caret-down.svg';
import { useToggler, useOutsideClick } from '@/hooks';
import styles from './index.module.css';

export interface Props {
  title?: ReactNode;
  className?: string;
  contentClassName?: string;
  btnClassName?: string;
}

export interface DropdownItemProps {
  active?: boolean;
  className?: string;
  onClick?: () => void;
}

export const DropdownItem: FunctionComponent<PropsWithChildren<DropdownItemProps>> = (props) => {
  const { children, active, className, onClick } = props;
  return (
    <div
      onClick={onClick}
      className={clsxm(
        styles['dropdown-item'],
        'text-dark-70 dark:text-white',
        active && [
          styles['active'],
          'text-accent-1 dark:text-accent-2'
        ],
        className
      )}
    >
      {children}
    </div>
  );
};

DropdownItem.defaultProps = {
  active: false,
  className: ''
};

const Dropdown = (props: PropsWithChildren<Props>) => {
  const {
    title,
    children,
    className,
    contentClassName,
    btnClassName
  } = props;

  const [show, toggler] = useToggler();
  const ref = useRef(null);

  const Items = useMemo(() => {
    return getChildrenByType(children, DropdownItem);
  }, [children]);

  const onItemClick = useCallback(() => {
    toggler(false);
  }, []);

  useOutsideClick(() => {
    toggler(false);
  }, [ref]);

  return (
    <div
      ref={ref}
      className={clsxm(
        styles.dropdown,
        className
      )}
    >
      <Button
        disableHover
        onClick={toggler}
        className={clsxm(styles.button, btnClassName)}
      >
        <span className="text-white dark:text-white">
          {title}
        </span>
        <span>
          <SVG className="ml-4 -mt-2" fill="white" src={IconCaretDown} size={12} />
        </span>
      </Button>
      {show && (
        <div
          className={clsxm(
            styles['dropdown-content'],
            'bg-white dark:bg-dark-60 shadow-md dark:shadow-dark-70',
            contentClassName
          )}
        >
          {Items.map(({ props, key }: any) => (
            <DropdownItem
              key={key}
              onClick={onItemClick}
              {...props || {}}
            />
          ))}
        </div>
      )}
    </div>
  );
};

Dropdown.defaultProps = {
  title: '',
  className: '',
  btnClassName: '',
  contentClassName: ''
};

Dropdown.Item = DropdownItem;

export default Dropdown;
