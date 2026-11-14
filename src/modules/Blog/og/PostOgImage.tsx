/* eslint-disable @next/next/no-img-element -- satori renders these to a PNG, there is no DOM for next/image */
import Fs from 'fs/promises';
import { ImageResponse } from 'next/og';
import path from 'path';

import { SITE_NAME } from '@/configs/sites';
import { getContent } from '@/modules/Content/services/content-parser';
import { I18nLocales } from '@/packages/libs/I18n/interface';

/** share-card size; the card is also what Twitter and Facebook crawl */
export const OG_SIZE = { width: 1200, height: 630 };

const COLORS = {
  base: '#17130F',
  content: '#F3ECE2',
  amber: '#E8A55A'
};

const ROOT = process.cwd();
const ASSETS = path.join(ROOT, 'src/assets/og');
const FALLBACK_BANNER = path.join(ROOT, 'public/media/default-banners/8.jpg');

const MIME: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp'
};

async function toDataUrl(file: string) {
  const buf = await Fs.readFile(file);
  const mime = MIME[path.extname(file).toLowerCase()] ?? 'image/png';
  return `data:${mime};base64,${buf.toString('base64')}`;
}

/** The post banner from /public; remote or missing banners fall back to the default one */
async function bannerDataUrl(image?: string) {
  if (!image || /^https?:\/\//.test(image)) return toDataUrl(FALLBACK_BANNER);
  return toDataUrl(path.join(ROOT, 'public', image)).catch(() => toDataUrl(FALLBACK_BANNER));
}

/**
 * Glue the last two words with a no-break space so the title never ends on a
 * lone word. (satori's `textWrap: balance` narrows every line instead, and a
 * long title then runs past 3 lines and gets cut.)
 */
function keepLastWordsTogether(title: string) {
  return title.replace(/\s+(\S+)$/, '\u00A0$1');
}

const LAYER = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: OG_SIZE.width,
  height: OG_SIZE.height,
  display: 'flex'
} as const;

/**
 * Share card of a blog post: banner, dark gradient, title, avatar and site name.
 * `ogTitle` in the frontmatter replaces the title when it is too long for a card.
 */
export async function renderPostOgImage(slug: string, lang: I18nLocales) {
  const { meta } = await getContent(slug, lang);
  const title = keepLastWordsTogether(meta.ogTitle?.trim() || meta.title);
  // long titles step down so ~90 characters still fit in 3 lines
  const fontSize = title.length > 72 ? 52 : 60;

  const [banner, avatar, grotesk, mono] = await Promise.all([
    bannerDataUrl(meta.image),
    toDataUrl(path.join(ASSETS, 'avatar-face.png')),
    Fs.readFile(path.join(ASSETS, 'SpaceGrotesk-700.ttf')),
    Fs.readFile(path.join(ASSETS, 'JetBrainsMono-500.ttf'))
  ]);

  return new ImageResponse(
    (
      <div style={{ ...LAYER, position: 'relative', width: '100%', height: '100%', background: COLORS.base }}>
        <img alt="" src={banner} width={OG_SIZE.width} height={OG_SIZE.height} style={{ ...LAYER, objectFit: 'cover' }} />
        {/* left to right: keeps busy banner captions on the right away from the title */}
        <div style={{ ...LAYER, backgroundImage: 'linear-gradient(90deg, rgba(23,19,15,0.97) 0%, rgba(23,19,15,0.93) 50%, rgba(23,19,15,0.62) 78%, rgba(23,19,15,0.3) 100%)' }} />
        {/* bottom to top: the title block sits here */}
        <div style={{ ...LAYER, backgroundImage: 'linear-gradient(0deg, rgba(23,19,15,0.98) 0%, rgba(23,19,15,0.88) 38%, rgba(23,19,15,0.4) 68%, rgba(23,19,15,0) 90%)' }} />

        <div style={{ ...LAYER, padding: 72, flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div
            style={{
              display: 'block',
              maxWidth: 960,
              fontFamily: 'Space Grotesk',
              fontWeight: 700,
              fontSize,
              lineHeight: 1.12,
              letterSpacing: -1,
              color: COLORS.content,
              lineClamp: 3,
              textOverflow: 'ellipsis',
              overflow: 'hidden'
            }}
          >
            {title}
          </div>

          <svg width="132" height="16" viewBox="0 0 132 16" style={{ marginTop: 22 }}>
            <path d="M2 8 Q 10.25 1 18.5 8 T 35 8 T 51.5 8 T 68 8 T 84.5 8 T 101 8 T 117.5 8 T 130 8" fill="none" stroke={COLORS.amber} strokeWidth="5" strokeLinecap="round" />
          </svg>

          <div style={{ display: 'flex', alignItems: 'center', marginTop: 36 }}>
            <img alt="" src={avatar} width={56} height={56} style={{ width: 56, height: 56, borderRadius: 28, border: `2px solid ${COLORS.amber}` }} />
            <div style={{ display: 'flex', marginLeft: 18, fontFamily: 'JetBrains Mono', fontWeight: 500, fontSize: 28, color: COLORS.amber }}>
              {SITE_NAME}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Space Grotesk', data: grotesk, weight: 700, style: 'normal' },
        { name: 'JetBrains Mono', data: mono, weight: 500, style: 'normal' }
      ]
    }
  );
}
