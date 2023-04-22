/* eslint-disable @next/next/no-img-element */
import { type NextRequest } from 'next/server';
import { type CSSProperties } from 'react';
import { ImageResponse } from '@vercel/og';

import { AUTHOR_NAME, BASE_URL, SITE_NAME } from '@/configs/env';
import clsxm from '@/utils/helpers/clsxm';

export const config = {
  runtime: 'edge'
};

export const poppins400 = fetch(
  new URL('../../assets/fonts/Poppins/Poppins-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export const poppins700 = fetch(
  new URL('../../assets/fonts/Poppins/Poppins-Bold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

async function OpenGraphHandler(req: NextRequest) {
  const poppinsRegular = await poppins400;
  const poppinsBold = await poppins700;

  const { searchParams } = new URL(req.url);

  const title = searchParams.get('title');
  const description = searchParams.get('description');
  const width = searchParams.get('width');
  const height = searchParams.get('height');
  const logo = searchParams.get('logo');
  const logoWidth = searchParams.get('logoWidth');
  const logoHeight = searchParams.get('logoHeight');

  const query = {
    title: title ?? AUTHOR_NAME,
    description: description ?? 'Software Engineer from Palembang, Indonesia 🇮🇩',
    width: width ? Number(width) : 1200,
    height: height ? Number(height) : 630,
    logo: logo ?? `${BASE_URL}/assets/icons/app/logo.svg`,
    logoWidth: logoWidth ? +logoWidth : 100,
    logoHeight: logoHeight ? +logoHeight : undefined
  };

  const Component = (
    <div
      tw={clsxm([
        'relative flex flex-col justify-center items-center',
        'w-full h-full',
        'text-center',
        'px-[4rem] bg-[#282F5E]'
      ])}
    >
      <div tw={clsxm('flex flex-col justify-center items-center -mt-10')}>
        <img
          style={{
            width: query.logoWidth,
            ...(query.logoHeight && { height: query.logoHeight })
          }}
          tw={clsxm(
            'rounded-full shadow-lg'
          )}
          src={query.logo}
          alt="Favicon"
        />
        <div tw={clsxm('flex flex-col justify-center items-center')}>
          <h1
            tw={clsxm(
              'mt-8',
              'text-6xl font-bold',
              'text-white'
            )}
          >
            <span
              style={{
                backgroundImage: 'linear-gradient(90deg, #5E72E4, #B89BFF)',
                backgroundClip: 'text',
                '-webkit-background-clip': 'text',
                color: 'transparent',
                padding: '0.5rem 0'
              } as CSSProperties}
            >
              {query.title}
            </span>
          </h1>
        </div>
        {query.description && (
          <p
            tw={clsxm(
              'text-3xl',
              'text-gray-300'
            )}
          >
            {query.description}
          </p>
        )}
      </div>
      <h3
        tw={clsxm(
          'text-2xl font-bold w-full absolute bottom-2 left-10',
          'text-gray-300'
        )}
      >
        {SITE_NAME}
      </h3>
      <p tw={clsxm('text-gray-300 absolute bottom-2 right-10 font-bold')}>
        {BASE_URL}
      </p>
    </div>
  );

  return new ImageResponse(Component, {
    width: query.width,
    height: query.height,
    emoji: 'twemoji',
    fonts: [
      {
        name: 'Poppins',
        data: poppinsRegular,
        weight: 400
      },
      {
        name: 'Poppins',
        data: poppinsBold,
        weight: 700
      }
    ]
  });
}

export default OpenGraphHandler;
