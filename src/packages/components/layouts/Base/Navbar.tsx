import NextLink from '@/packages/components/base/Navigations/NextLink';

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

function Navbar() {
  return (
    <div className="bg-base-300 shadow-md">
      <nav className="navbar max-w-5xl mx-auto">
        <div className="flex-1">
          <NextLink href="/" className="font-courgette text-xl">
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
      </nav>
    </div>
  );
}

export default Navbar;
