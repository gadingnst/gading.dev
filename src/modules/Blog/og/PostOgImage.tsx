import { ImageResponse } from 'next/og';
import sharp from 'sharp';

import { getContent } from '@/modules/Content/services/content-parser';
import { I18nLocales } from '@/packages/libs/I18n/interface';

import { keepLastWordsTogether, loadBanner, loadOgAssets, OG_COLORS } from './assets';
import { Banner, layer, Lockup, MonoText, TagBadges, Title, Wave } from './pieces';

/** link card, 1.91:1; also what Twitter and Facebook crawl */
export const OG_SIZE = { width: 1200, height: 630 };

export const SHARE_FORMATS = ['9x16', '4x5', '1x1'] as const;
export type ShareFormat = typeof SHARE_FORMATS[number];

export const SHARE_SIZES: Record<ShareFormat, { width: number; height: number }> = {
  '9x16': { width: 1080, height: 1920 },
  '4x5': { width: 1080, height: 1350 },
  '1x1': { width: 1080, height: 1080 }
};

const MUTED = 'rgba(243,236,226,0.72)';

interface PostCard {
  title: string;
  description: string;
  tags: string[];
  readTime: string;
  banner: string;
  avatar: string;
}

/** the title font steps down as the title grows, so nothing reaches the line clamp */
function titleSize(title: string, steps: [number, number][], base: number) {
  return steps.find(([chars]) => title.length > chars)?.[1] ?? base;
}

async function loadPostCard(slug: string, lang: I18nLocales): Promise<PostCard> {
  const { meta } = await getContent(slug, lang);
  const [banner, assets] = await Promise.all([loadBanner(meta.image), loadOgAssets()]);
  return {
    // `ogTitle` in the frontmatter replaces the title when it is too long for a card
    title: keepLastWordsTogether(meta.ogTitle?.trim() || meta.title),
    description: meta.description?.trim() ?? '',
    tags: meta.tags ?? [],
    readTime: `${Math.max(1, Math.ceil(meta.readTime.minutes))} min read`,
    banner,
    avatar: assets.avatar
  };
}

function OgLayout({ card }: { card: PostCard }) {
  const { width, height } = OG_SIZE;
  return (
    <div style={{ ...layer(width, height), position: 'relative', background: OG_COLORS.base }}>
      {/* left to right: keeps busy banner captions on the right away from the title */}
      <Banner
        src={card.banner}
        width={width}
        height={height}
        fade="linear-gradient(90deg, rgba(23,19,15,0.97) 0%, rgba(23,19,15,0.93) 50%, rgba(23,19,15,0.62) 78%, rgba(23,19,15,0.3) 100%)"
      />
      {/* bottom to top: the title block sits here */}
      <div style={{ ...layer(width, height), backgroundImage: 'linear-gradient(0deg, rgba(23,19,15,0.98) 0%, rgba(23,19,15,0.88) 38%, rgba(23,19,15,0.4) 68%, rgba(23,19,15,0) 90%)' }} />
      <div style={{ ...layer(width, height), padding: '0 72px 60px', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div style={{ display: 'flex', maxWidth: 960 }}>
          <Title text={card.title} fontSize={titleSize(card.title, [[72, 52]], 58)} maxLines={3} letterSpacing={-1} lineHeight={1.12} />
        </div>
        <Wave width={132} marginTop={22} />
        <div style={{ display: 'flex', marginTop: 30 }}>
          <Lockup size={60} avatar={card.avatar} nameSize={28} domainSize={22} />
        </div>
      </div>
    </div>
  );
}

/** Story: Instagram covers the top ~250px and bottom ~340px, and the space under the meta line is for a link sticker */
function StoryLayout({ card }: { card: PostCard }) {
  const { width, height } = SHARE_SIZES['9x16'];
  return (
    <div style={{ ...layer(width, height), position: 'relative', background: OG_COLORS.base }}>
      <Banner
        src={card.banner}
        width={width}
        height={1000}
        fade="linear-gradient(180deg, rgba(23,19,15,0.2) 0%, rgba(23,19,15,0.35) 30%, rgba(23,19,15,0.88) 62%, #17130F 92%)"
      />
      <div style={{ position: 'absolute', top: 270, left: 88, display: 'flex' }}>
        <Lockup size={84} avatar={card.avatar} nameSize={36} domainSize={26} pill />
      </div>
      <div style={{ position: 'absolute', left: 88, right: 88, bottom: 560, display: 'flex', flexDirection: 'column' }}>
        <TagBadges tags={card.tags} fontSize={28} maxWidth={904} />
        <Title text={card.title} fontSize={titleSize(card.title, [[80, 66], [60, 72]], 80)} maxLines={5} marginTop={card.tags.length ? 34 : 0} />
        <Wave width={176} marginTop={36} />
        {card.description && <MonoText text={card.description} fontSize={32} marginTop={32} color={MUTED} maxLines={4} />}
        <MonoText text={card.readTime} fontSize={30} marginTop={40} color={OG_COLORS.amber} lineHeight={1.2} />
      </div>
    </div>
  );
}

/** Feed: the banner box runs past the half and fades out fully, so there is no hard edge */
function FeedLayout({ card }: { card: PostCard }) {
  const { width, height } = SHARE_SIZES['4x5'];
  return (
    <div style={{ ...layer(width, height), position: 'relative', background: OG_COLORS.base }}>
      <Banner
        src={card.banner}
        width={width}
        height={820}
        fade="linear-gradient(180deg, rgba(23,19,15,0.2) 0%, rgba(23,19,15,0.35) 28%, rgba(23,19,15,0.75) 55%, rgba(23,19,15,0.95) 75%, #17130F 96%)"
      />
      <div style={{ position: 'absolute', top: 72, left: 80, display: 'flex' }}>
        <Lockup size={72} avatar={card.avatar} nameSize={32} domainSize={23} pill />
      </div>
      <div style={{ position: 'absolute', left: 80, right: 80, bottom: 80, display: 'flex', flexDirection: 'column' }}>
        <TagBadges tags={card.tags} fontSize={26} maxWidth={920} />
        <Title text={card.title} fontSize={titleSize(card.title, [[80, 58], [60, 64]], 70)} maxLines={4} marginTop={card.tags.length ? 28 : 0} />
        <Wave width={150} marginTop={28} />
        {card.description && <MonoText text={card.description} fontSize={28} marginTop={26} color={MUTED} maxLines={3} />}
        <MonoText text={card.readTime} fontSize={27} marginTop={30} color={OG_COLORS.amber} lineHeight={1.2} />
      </div>
    </div>
  );
}

/** Square: no description, the title carries it */
function SquareLayout({ card }: { card: PostCard }) {
  const { width, height } = SHARE_SIZES['1x1'];
  return (
    <div style={{ ...layer(width, height), position: 'relative', background: OG_COLORS.base }}>
      <Banner
        src={card.banner}
        width={width}
        height={height}
        fade="linear-gradient(0deg, #17130F 0%, rgba(23,19,15,0.95) 45%, rgba(23,19,15,0.6) 75%, rgba(23,19,15,0.35) 100%)"
      />
      <div style={{ position: 'absolute', top: 72, left: 80, display: 'flex' }}>
        <Lockup size={72} avatar={card.avatar} nameSize={32} domainSize={23} pill />
      </div>
      <div style={{ position: 'absolute', left: 80, right: 80, bottom: 80, display: 'flex', flexDirection: 'column' }}>
        <TagBadges tags={card.tags} fontSize={26} maxWidth={920} />
        <Title text={card.title} fontSize={titleSize(card.title, [[80, 60], [60, 66]], 74)} maxLines={4} marginTop={card.tags.length ? 28 : 0} />
        <Wave width={150} marginTop={30} />
        <MonoText text={card.readTime} fontSize={28} marginTop={30} color={OG_COLORS.amber} lineHeight={1.2} />
      </div>
    </div>
  );
}

const LAYOUTS = { '9x16': StoryLayout, '4x5': FeedLayout, '1x1': SquareLayout };

/** Link card of a blog post, PNG */
export async function renderPostOgImage(slug: string, lang: I18nLocales) {
  const [card, { fonts }] = await Promise.all([loadPostCard(slug, lang), loadOgAssets()]);
  return new ImageResponse(<OgLayout card={card} />, { ...OG_SIZE, fonts });
}

/** Shareable image of a blog post: satori draws a PNG, sharp turns it into a JPEG */
export async function renderPostShareImage(slug: string, lang: I18nLocales, format: ShareFormat) {
  const [card, { fonts }] = await Promise.all([loadPostCard(slug, lang), loadOgAssets()]);
  const Layout = LAYOUTS[format];
  const png = await new ImageResponse(<Layout card={card} />, { ...SHARE_SIZES[format], fonts }).arrayBuffer();
  const jpeg = await sharp(Buffer.from(png)).jpeg({ quality: 85, mozjpeg: true }).toBuffer();
  return new Response(new Uint8Array(jpeg), {
    headers: { 'content-type': 'image/jpeg' }
  });
}
