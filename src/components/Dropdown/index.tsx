import { FunctionComponent, PropsWithChildren, ReactNode, useCallback, useRef } from 'react';
import { getChildrenByType } from 'react-nanny';
import Button from '@/components/Button';
import Icon from '@/components/Image/Icon';
import clsxm from '@/utils/helpers/clsxm';
import iconCaretDown from '@/assets/icons/tools/caret-down.svg';
import { useToggler, useOutsideClick } from '@/hooks';
import styles from './index.module.css';

export interface Props {
  title?: ReactNode;
  className?: string;
  contentClassName?: string;
}

export interface DropdownItemProps {
  active?: boolean;
  onClick?: () => void;
}

export const DropdownItem: FunctionComponent<PropsWithChildren<DropdownItemProps>> = (props) => {
  const { children, active, onClick } = props;
  return (
    <div
      onClick={onClick}
      className={clsxm(
        styles['dropdown-item'],
        'text-dark-70 dark:text-white',
        active && [
          styles['active'],
          'text-accent-1 dark:text-accent-2'
        ]
      )}
    >
      {children}
    </div>
  );
};

DropdownItem.defaultProps = {
  active: false
};

const Dropdown = (props: PropsWithChildren<Props>) => {
  const {
    title,
    children,
    className,
    contentClassName
  } = props;

  const [show, toggler] = useToggler();
  const ref = useRef(null);
  const Items = getChildrenByType(children, DropdownItem);

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
        className={styles.button}
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
  className: ''
};

Dropdown.Item = DropdownItem;

export default Dropdown;
