import { Fragment, FunctionComponent, PropsWithChildren, ReactNode, useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import Link from '@/components/base/Link';
import SwitchTheme from '@/components/base/Switch/Theme';
import ButtonClose from '@/components/base/Button/Close';
import Icon from '@/components/base/Image/Icon';
import Modal from '@/components/base/Modal';
import Dropdown from '@/components/base/Dropdown';

import { useToggler, useMounted } from '@/hooks';
import { DEFAULT_LOCALE, SITE_NAME } from '@/utils/config';
import clsxm from '@/utils/helpers/clsxm';

import iconAppLogo from '@/assets/icons/app/logo.svg';
import iconAppLogoSecondary from '@/assets/icons/app/logo-secondary.svg';
import iconHamburger from '@/assets/icons/tools/hamburger.svg';
import styles from './styles.module.css';
import useAppTheme from '@/hooks/stores/useAppTheme';
import { I18nLocales } from '@/types/contents';

interface LocaleItemProps {
  code: I18nLocales;
  active: boolean;
  pathname: string;
  asPath: string;
  onLocaleChange?: (locale: I18nLocales) => {
    pathname?: string;
    asPath?: string;
  };
}

export interface Props {
  title?: ReactNode|string;
  className?: string;
  localeChange?: boolean;
  onLocaleChange?: LocaleItemProps['onLocaleChange'];
}

export const menus = [
  { label: 'Now', href: '/now' },
  { label: 'Blog', href: '/blog' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' }
];

export const i18nList = new Map([
  ['en', <>🇺🇸&nbsp;&nbsp;EN</>],
  ['id', <>🇮🇩&nbsp;&nbsp;ID</>]
]);

const LocaleItem: FunctionComponent<PropsWithChildren<LocaleItemProps>> = (props) => {
  const {
    children,
    code,
    active,
    pathname,
    asPath,
    onLocaleChange
  } = props;
  const locales = useMemo(() => onLocaleChange?.(code) ?? {}, []);
  return (
    <Link
      href={locales.pathname ?? pathname}
      asPath={locales.asPath ?? asPath}
      locale={code}
      className={clsxm(
        'text-dark-70 dark:text-white hover:no-underline',
        active && 'text-accent-1 dark:text-accent-2'
      )}
    >
      {children}
    </Link>
  );
};

const Navbar: FunctionComponent<Props> = (props) => {
  const { title, className, localeChange, onLocaleChange } = props;
  const [transparent, setTransparent] = useState(true);
  const [modalVisibility, modalToggler] = useToggler();
  const { pathname, locale, asPath } = useRouter();
  const [theme] = useAppTheme();

  const textShadowClass = useMemo(() => {
    return transparent ? 'util--text-shadow' : '';
  }, [transparent]);

  const headerClass = useMemo(() => {
    return transparent
      ? 'bg-transparent'
      : 'bg-primary shadow-bottom dark:bg-dark-40';
  }, [transparent]);

  const onScroll = useCallback(() => {
    setTransparent(window.scrollY < 5);
  }, []);

  const localeChanges = useCallback((code: string) => {
    return onLocaleChange?.(code as I18nLocales) ?? {};
  }, [onLocaleChange]);

  useMounted(() => {
    setTransparent(window.scrollY < 5);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });

  return (
    <Fragment>
      <nav className={clsxm(styles.header, headerClass, className)}>
        <div className={styles['header-container']}>
          <Icon
            className="inline-block xxs:hidden mr-8"
            src={theme?.current === 'dark' ? iconAppLogo : iconAppLogoSecondary}
            size={32}
          />
          <Link
            href="/"
            className={clsxm(
              'hidden xxs:flex justify-center items-center text-base transition-all duration-150 xs:text-2xl text-white dark:text-white hover:scale-105 hover:no-underline hover:text-light-50',
              textShadowClass
            )}
          >
            {title}
          </Link>
          <div className="flex flex-grow font-poppins font-bold justify-end items-center xs:ml-16">
            {localeChange && (
              <Dropdown
                className="bg-transparent px-8 pt-[3px]"
                title={i18nList.get(locale || DEFAULT_LOCALE)}
                btnClassName="text-sm md:text-base"
              >
                {Array.from(i18nList).map(([code, label]) => (
                  <Dropdown.Item key={code} className="text-sm md:text-base" active={code === locale}>
                    <LocaleItem
                      active={code === locale}
                      pathname={pathname}
                      asPath={asPath}
                      onLocaleChange={localeChanges}
                      code={code as I18nLocales}
                    >
                      {label}
                    </LocaleItem>
                  </Dropdown.Item>
                ))}
              </Dropdown>
            )}
            <SwitchTheme className={clsxm(textShadowClass, 'px-8')} />
            <div className="hidden md:block">
              {menus.map(({ label, href }, idx) => (
                <Link
                  key={href}
                  href={href}
                  className={clsxm(
                    'font-bold text-lg mx-8 transition-all duration-200 hover:scale-105 hover:no-underline',
                    idx === (menus.length - 1) ? 'mr-0' : '',
                    pathname === href && 'pointer-events-none',
                    textShadowClass
                  )}
                >
                  <span
                    className={clsxm({
                      'text-accent dark:text-accent-2': pathname === href,
                      'text-white dark:text-white': pathname !== href
                    })}
                  >
                    {label}
                  </span>
                </Link>
              ))}
            </div>
            <div className="block md:hidden">
              <Icon
                color="white"
                src={iconHamburger}
                className="cursor-pointer"
                onClick={modalToggler}
              />
            </div>
          </div>
        </div>
      </nav>
      <Modal
        show={modalVisibility}
        toggler={modalToggler}
        className={clsxm(
          styles['header-mobile'],
          'bg-white self-start justify-self-center dark:bg-dark-60'
        )}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="font-courgette transition-all duration-200 font-bold text-xl text-dark dark:text-white hover:no-underline hover:scale-105">
            {title}
          </Link>
          <ButtonClose onClick={modalToggler} />
        </div>
        <hr className="my-8" />
        <div className="flex flex-col justify-center">
          {menus.map(({ label, href }, idx) => (
            <Link
              key={href}
              href={href}
              delay={150}
              className={clsxm(
                'font-bold my-4 transition-all duration-100 hover:scale-102 active:scale-100',
                idx === (menus.length - 1) ? 'mb-0' : '',
                pathname === href
                  ? 'pointer-events-none text-accent dark:text-accent-2'
                  : 'text-dark dark:text-white'
              )}
            >
              {label}
            </Link>
          ))}
        </div>
      </Modal>
    </Fragment>
  );
};

Navbar.defaultProps = {
  title: SITE_NAME,
  className: ''
};

export default Navbar;
