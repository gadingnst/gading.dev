/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';
import { type NextRequest } from 'next/server';
import { type CSSProperties } from 'react';

import { AUTHOR_NAME, BASE_URL, SITE_NAME } from '@/configs/env';
import clsxm from '@/utils/helpers/clsxm';

export const config = {
  runtime: 'edge'
};

async function OpenGraphHandler(req: NextRequest) {
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
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 5rem',
        position: 'relative',
        backgroundColor: '#282F5E'
      }}
    >
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
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
      <h3
        tw={clsxm(
          'text-2xl font-bold w-full absolute bottom-2 left-10',
          'text-gray-300'
        )}
      >
        {SITE_NAME}
      </h3>
      <p tw={clsxm('text-gray-300 absolute bottom-2 right-10 font-semibold')}>
        {BASE_URL}
      </p>
    </div>
  );

  return new ImageResponse(Component, {
    width: query.width,
    height: query.height,
    emoji: 'twemoji'
  });
}

export default OpenGraphHandler;
