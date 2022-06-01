/* eslint-disable @typescript-eslint/no-var-requires */
import { NextPage } from 'next';
import { Fragment, FunctionComponent, PropsWithChildren } from 'react';
import { Content, Link, SwitchTheme, withLayoutPage } from '@/components';
import { SITE_NAME } from '@/utils/config';

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
    <div className="flex flex-col border rounded-8 my-16 p-8">
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
    <div key={key} className="w-[120px] shadow-all rounded-8 m-8 py-16 px-12">
      <div className={`w-full shadow-all rounded-8 h-[20px] bg-${name}`} />
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
      <div className="flex mb-24 bg-primary py-16 px-52 justify-between">
        <Link href="/">
          <h1 className="font-courgette font-bold text-center text-xl text-white">
            {SITE_NAME}
          </h1>
        </Link>
        <SwitchTheme />
      </div>
      <Content className="px-52 mb-48">
        <h1 className="font-bold text-center text-2xl mb-16">
          Colors System
        </h1>
        <div className="p-16 rounded-16 shadow-all mb-42">
          <ColorCard title="ABSOLUTE">
            {absoluteColors.map(([name, value]: string[]) => renderColorMap(name, value))}
          </ColorCard>
          {variantColors.map(([name, value]: string[], idx: number) => (
            <ColorCard key={idx} title={name.toUpperCase()}>
              {renderColorMap(name, value)}
            </ColorCard>
          ))}
        </div>
      </Content>
    </Fragment>
  );
};

export default withLayoutPage(ColorDocs, {
  meta: {
    title: 'Colors System',
    slug: 'docs/colors',
    date: '2022-06-01',
    description: 'Colors System for Gading\'s Hideout',
    keywords: 'colors system'
  }
});
