import NextLink from '@/packages/components/base/Navigations/NextLink';
import cxm from '@/packages/utils/cxm';

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
      className={cxm([
        'header-primary shadow-md flex-shrink-0',
        className
      ])}
    >
      <div className="navbar base-container">
        <div className="flex-1">
          <NextLink href="/" className="font-courgette text-xl hover:text-shadow-white">
            Gading&apos;s Hideout
          </NextLink>
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
                      <NextLink href={`${code}`}>
                        {label}
                      </NextLink>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            <li>
              <NextLink href="">
                H
              </NextLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
