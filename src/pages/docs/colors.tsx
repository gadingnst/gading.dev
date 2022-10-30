/* eslint-disable @typescript-eslint/no-var-requires */
import type { NextPage } from 'next';
import { Fragment, FunctionComponent, PropsWithChildren } from 'react';
import { Link, SwitchTheme } from '@/components/base';
import { SITE_NAME } from '@/utils/config';
import { Content, Footer, withMainLayoutPage } from '@/components/layouts';

const theme = require('../../../tailwind.config').theme;
const themeColors = Object.entries(theme.colors);
const [absoluteColors, variantColors] = themeColors.reduce((acc: any, curr) => {
  const [, value] = curr;
  const idx = typeof value === 'string' ? 0 : 1;
  acc[idx].push(curr);
  return acc;
}, [[], []]);

const ColorCard: FunctionComponent<PropsWithChildren<{ title: string; }>> =
  ({ title, children }) => (
    <div className="flex flex-col border dark:border-white rounded-8 my-16 p-8">
      <div className="w-[120px] flex justify-center items-center">
        <p className="font-bold px-16 text-center text-lg">{title}</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {children}
      </div>
    </div>
  );

const renderColorMap = (name: string, color: string) => {
  const mapColor = (key:  string, name: string, color: string) => (
    <div key={key} className="w-[120px] shadow-lg rounded-8 m-8 py-16 px-12">
      <div className={`w-full shadow-lg rounded-8 h-[20px] bg-${name}`} />
      <p className="font-bold text-center mt-4 text-light text-sm">
        {name}
      </p>
      <div className="mt-8">
        <p className="font-bold text-sm">Code:</p>
        <p>{color}</p>
      </div>
    </div>
  );

  if (typeof color === 'string') {
    return mapColor(`${name}-${color}`, name, color);
  }

  return Object.entries(color).map(([key, val]) => {
    const colorClass = `${name}${key !== 'DEFAULT' ? `-${key}` : ''}`;
    return mapColor(`${name}-${key}`, colorClass, val as string);
  });
};

const ColorDocs: NextPage = () => {
  return (
    <Fragment>
      <div className="flex items-center justify-center mb-24 bg-primary dark:bg-dark-60 py-16 px-52 fixed w-screen z-50">
        <div className="flex justify-between container lg:max-w-5xl">
          <Link href="/" className="hover:no-underline hover:util--text-shadow-white hover:scale-105">
            <h1 className="font-courgette font-bold text-center text-xl text-white">
              {SITE_NAME}
            </h1>
          </Link>
          <SwitchTheme />
        </div>
      </div>
      <Content className="px-52 mt-80 mb-48">
        <div className="flex flex-col container lg:max-w-5xl justify-center items-center mx-auto">
          <h1 className="font-bold text-center text-2xl mb-16">
            Colors System
          </h1>
          <div className="p-16 rounded-16 shadow-lg dark:shadow-primary mb-42 w-full">
            <ColorCard title="ABSOLUTE">
              {absoluteColors.map(([name, value]: string[]) => renderColorMap(name, value))}
            </ColorCard>
            {variantColors.map(([name, value]: string[], idx: number) => (
              <ColorCard key={idx} title={name.toUpperCase()}>
                {renderColorMap(name, value)}
              </ColorCard>
            ))}
          </div>
        </div>
      </Content>
      <Footer />
    </Fragment>
  );
};

export default withMainLayoutPage(ColorDocs, {
  meta: {
    title: 'Colors System',
    slug: 'docs/colors',
    date: '2022-06-01',
    description: 'Colors System for Gading\'s Hideout',
    keywords: 'colors system'
  }
});
