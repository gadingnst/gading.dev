import Fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

export const OG_COLORS = {
  base: '#17130F',
  content: '#F3ECE2',
  amber: '#E8A55A'
};

const ROOT = process.cwd();
const ASSETS = path.join(ROOT, 'src/assets/og');
const FALLBACK_BANNER = path.join(ROOT, 'public/media/default-banners/8.jpg');

/** widest canvas a banner is drawn on; bigger sources are scaled down once */
const BANNER_WIDTH = 1200;

export interface OgAssets {
  avatar: string;
  fonts: {
    name: string;
    data: Buffer;
    weight: 500 | 700;
    style: 'normal';
  }[];
}

let assetsPromise: Promise<OgAssets> | null = null;

/** Avatar and fonts, read once per build worker and shared by every image */
export function loadOgAssets() {
  if (!assetsPromise) {
    assetsPromise = Promise.all([
      Fs.readFile(path.join(ASSETS, 'avatar-face.png')),
      Fs.readFile(path.join(ASSETS, 'SpaceGrotesk-700.ttf')),
      Fs.readFile(path.join(ASSETS, 'JetBrainsMono-500.ttf'))
    ]).then(([avatar, grotesk, mono]) => ({
      avatar: `data:image/png;base64,${avatar.toString('base64')}`,
      fonts: [
        { name: 'Space Grotesk', data: grotesk, weight: 700, style: 'normal' },
        { name: 'JetBrains Mono', data: mono, weight: 500, style: 'normal' }
      ]
    }));
  }
  return assetsPromise;
}

const bannerCache = new Map<string, Promise<string>>();

async function bannerFileToDataUrl(file: string) {
  const jpeg = await sharp(file)
    .resize({ width: BANNER_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: 88 })
    .toBuffer();
  return `data:image/jpeg;base64,${jpeg.toString('base64')}`;
}

/**
 * The post banner from /public, scaled to the widest canvas and cached, so the
 * four images of a post decode it once. Remote or missing banners fall back to
 * the default one.
 */
export function loadBanner(image?: string) {
  const file = !image || /^https?:\/\//.test(image) ? FALLBACK_BANNER : path.join(ROOT, 'public', image);
  let banner = bannerCache.get(file);
  if (!banner) {
    banner = bannerFileToDataUrl(file).catch(() => bannerFileToDataUrl(FALLBACK_BANNER));
    bannerCache.set(file, banner);
  }
  return banner;
}

/**
 * Glue the last two words with a no-break space so the title never ends on a
 * lone word. (satori's `textWrap: balance` narrows every line instead, and a
 * long title then runs past its line budget and gets cut.)
 */
export function keepLastWordsTogether(title: string) {
  return title.trim().replace(/\s+(\S+)$/, '\u00A0$1');
}
