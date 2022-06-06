import { FunctionComponent, PropsWithChildren, ReactNode, useCallback, useMemo, useRef } from 'react';
import { getChildrenByType } from 'react-nanny';
import Button from '@/components/base/Button';
import Icon from '@/components/base/Image/Icon';
import clsxm from '@/utils/helpers/clsxm';
import iconCaretDown from '@/assets/icons/tools/caret-down.svg';
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
        onClick={toggler}
        className={clsxm(styles.button, btnClassName)}
      >
        {title} <Icon color="white" src={iconCaretDown} size={12} className="-mt-4" />
      </Button>
      {show && (
        <div
          className={clsxm(
            styles['dropdown-content'],
            'bg-white dark:bg-dark-40',
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
