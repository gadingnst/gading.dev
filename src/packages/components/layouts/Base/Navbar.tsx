import LocaleLink from '@/packages/components/base/Navigations/LocaleLink';
import UnstyledLink from '@/packages/components/base/Navigations/UnstyledLink';
import cn from '@/packages/utils/cn';

interface Props {
  className?: string;
}

export const menus = [
  { label: 'Now', href: '/now' },
  { label: 'Blog', href: '/blog' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' }
];

export const i18nList = new Map([
  ['en', '🇺🇸 EN'],
  ['id', '🇮🇩 ID']
]);

function Navbar({ className }: Props) {
  return (
    <nav
      className={cn([
        'header-primary shadow-md flex-shrink-0',
        className
      ])}
    >
      <div className="navbar base-container">
        <div className="flex-1">
          <UnstyledLink href="/" className="font-courgette text-xl hover:text-shadow-white">
            Gading&apos;s Hideout
          </UnstyledLink>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>
                  Parent
                </summary>
                <ul className="p-2 bg-base-100">
                  {Array.from(i18nList).map(([code, label]) => (
                    <li key={code}>
                      <LocaleLink locale={code}>
                        {label}
                      </LocaleLink>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            <li>
              <UnstyledLink href="">
                H
              </UnstyledLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
