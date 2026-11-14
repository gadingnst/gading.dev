/* eslint-disable @next/next/no-img-element -- satori renders these to an image, there is no DOM for next/image */
import type { CSSProperties } from 'react';

import { SITE_DOMAIN, SITE_NAME } from '@/configs/sites';

import { OG_COLORS } from './assets';

/** a full-canvas layer; satori has no `inset` */
export function layer(width: number, height: number): CSSProperties {
  return { position: 'absolute', top: 0, left: 0, width, height, display: 'flex' };
}

interface BannerProps {
  src: string;
  width: number;
  height: number;
  /** CSS gradient laid over the banner box, ending in the base colour where the banner ends */
  fade: string;
}

/** Banner photo with its fade, anchored to the top of the canvas */
export function Banner({ src, width, height, fade }: BannerProps) {
  return (
    <div style={layer(width, height)}>
      <img alt="" src={src} width={width} height={height} style={{ ...layer(width, height), objectFit: 'cover' }} />
      <div style={{ ...layer(width, height), backgroundImage: fade }} />
    </div>
  );
}

interface LockupProps {
  /** avatar diameter; the type scales from it */
  size: number;
  avatar: string;
  nameSize: number;
  domainSize: number;
  /** dark pill behind the lockup, for when it sits on the banner */
  pill?: boolean;
  nameColor?: string;
  domainColor?: string;
}

/** Avatar with "Gading's Hideout" over "gading.dev": the brand mark on every image */
export function Lockup(props: LockupProps) {
  const { size, avatar, nameSize, domainSize, pill = false, nameColor = OG_COLORS.content, domainColor = OG_COLORS.amber } = props;
  const gap = Math.round(size * 0.24);
  const pad = Math.round(size * 0.17);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        ...(pill ? {
          background: 'rgba(23,19,15,0.72)',
          borderRadius: 999,
          padding: `${pad}px ${Math.round(pad * 2.3)}px ${pad}px ${pad}px`
        } : {})
      }}
    >
      <img
        alt=""
        src={avatar}
        width={size}
        height={size}
        style={{ width: size, height: size, borderRadius: size / 2, border: `3px solid ${OG_COLORS.amber}` }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: gap }}>
        <div style={{ display: 'flex', fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: nameSize, lineHeight: 1.1, color: nameColor }}>
          {SITE_NAME}
        </div>
        <div style={{ display: 'flex', marginTop: 4, fontFamily: 'JetBrains Mono', fontWeight: 500, fontSize: domainSize, lineHeight: 1.2, color: domainColor }}>
          {SITE_DOMAIN}
        </div>
      </div>
    </div>
  );
}

interface TagBadgesProps {
  tags: string[];
  fontSize: number;
  /** room for the row; tags that would not fit on one line are dropped */
  maxWidth: number;
}

const MAX_TAGS = 3;
/** JetBrains Mono advance is 0.6em */
const MONO_ADVANCE = 0.6;

/** Up to three solid amber pills on one row */
export function TagBadges({ tags, fontSize, maxWidth }: TagBadgesProps) {
  const padX = Math.round(fontSize * 0.8);
  const gap = Math.round(fontSize * 0.48);
  const shown: string[] = [];
  let used = 0;
  for (const tag of tags.slice(0, MAX_TAGS)) {
    const width = tag.length * fontSize * MONO_ADVANCE + padX * 2 + (shown.length ? gap : 0);
    if (used + width > maxWidth) break;
    shown.push(tag);
    used += width;
  }
  if (!shown.length) return null;
  return (
    <div style={{ display: 'flex' }}>
      {shown.map((tag, index) => (
        <div
          key={tag}
          style={{
            display: 'flex',
            marginLeft: index ? gap : 0,
            padding: `${Math.round(fontSize * 0.36)}px ${padX}px`,
            borderRadius: 999,
            background: OG_COLORS.amber,
            color: OG_COLORS.base,
            fontFamily: 'JetBrains Mono',
            fontWeight: 500,
            fontSize,
            lineHeight: 1.1
          }}
        >
          {tag}
        </div>
      ))}
    </div>
  );
}

/** The amber wave under the title */
export function Wave({ width, marginTop }: { width: number; marginTop: number }) {
  const height = Math.round((width / 132) * 16);
  return (
    <svg width={width} height={height} viewBox="0 0 132 16" style={{ marginTop }}>
      <path d="M2 8 Q 10.25 1 18.5 8 T 35 8 T 51.5 8 T 68 8 T 84.5 8 T 101 8 T 117.5 8 T 130 8" fill="none" stroke={OG_COLORS.amber} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

interface TitleProps {
  text: string;
  fontSize: number;
  maxLines: number;
  marginTop?: number;
  letterSpacing?: number;
  lineHeight?: number;
}

/** Post title; `maxLines` is a last resort, sizes are picked so it is not reached */
export function Title({ text, fontSize, maxLines, marginTop = 0, letterSpacing = -2, lineHeight = 1.06 }: TitleProps) {
  return (
    <div
      style={{
        display: 'block',
        marginTop,
        fontFamily: 'Space Grotesk',
        fontWeight: 700,
        fontSize,
        lineHeight,
        letterSpacing,
        color: OG_COLORS.content,
        lineClamp: maxLines,
        textOverflow: 'ellipsis',
        overflow: 'hidden'
      }}
    >
      {text}
    </div>
  );
}

interface MonoTextProps {
  text: string;
  fontSize: number;
  marginTop: number;
  color: string;
  maxLines?: number;
  lineHeight?: number;
}

/** Description and the "N min read" line */
export function MonoText({ text, fontSize, marginTop, color, maxLines, lineHeight = 1.5 }: MonoTextProps) {
  return (
    <div
      style={{
        display: 'block',
        marginTop,
        fontFamily: 'JetBrains Mono',
        fontWeight: 500,
        fontSize,
        lineHeight,
        color,
        ...(maxLines ? { lineClamp: maxLines, textOverflow: 'ellipsis', overflow: 'hidden' } : {})
      }}
    >
      {text}
    </div>
  );
}
