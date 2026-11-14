'use client';

import { Check, Download, Link as LinkIcon, Share2, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

import cn from '@/designs/utils/cn';
import useClipboard from '@/packages/hooks/useClipboard';
import createContentLocales from '@/packages/libs/I18n/locales';

export const SHARE_IMAGE_FORMATS = [
  { id: '9x16', file: 'share/9x16.jpg', type: 'image/jpeg', width: 1080, height: 1920 },
  { id: '4x5', file: 'share/4x5.jpg', type: 'image/jpeg', width: 1080, height: 1350 },
  { id: '1x1', file: 'share/1x1.jpg', type: 'image/jpeg', width: 1080, height: 1080 },
  { id: '1.91x1', file: 'og.png', type: 'image/png', width: 1200, height: 630 }
] as const;

type FormatId = typeof SHARE_IMAGE_FORMATS[number]['id'];

const withLocales = createContentLocales({
  title: { en: 'Shareable image', id: 'Gambar untuk dibagikan' },
  close: { en: 'Close', id: 'Tutup' },
  size: { en: 'Size', id: 'Ukuran' },
  '9x16': { en: '9:16 Story', id: '9:16 Story' },
  '4x5': { en: '4:5 Feed', id: '4:5 Feed' },
  '1x1': { en: '1:1 Square', id: '1:1 Square' },
  '1.91x1': { en: '1.91:1 Link', id: '1.91:1 Link' },
  preview: { en: 'Preview of the image', id: 'Pratinjau gambar' },
  download: { en: 'Download', id: 'Unduh' },
  share: { en: 'Share', id: 'Bagikan' },
  copy: { en: 'Copy link', id: 'Salin link' },
  copied: { en: 'Copied!', id: 'Tersalin!' },
  hint: { en: 'Paste the link into a link sticker.', id: 'Tempel link-nya di link sticker.' }
});

interface Props {
  open: boolean;
  onClose: () => void;
  /** `{lang}/blog/{slug}` */
  path: string;
  slug: string;
  url: string;
  title: string;
  language: string;
  umamiSuffix: string;
}

/** fetched before the tap: iOS Safari drops the share sheet if the gesture is spent on a fetch */
function usePreparedFile(src: string, name: string, type: string, enabled: boolean) {
  // keyed by src so a stale file from the previous size is never offered
  const [prepared, setPrepared] = useState<{ src: string; file: File } | null>(null);
  useEffect(() => {
    if (!enabled || typeof navigator.canShare !== 'function') return;
    let cancelled = false;
    fetch(src)
      .then((res) => (res.ok ? res.blob() : Promise.reject(new Error(`${res.status}`))))
      .then((blob) => {
        const file = new File([blob], name, { type });
        if (!cancelled && navigator.canShare({ files: [file] })) setPrepared({ src, file });
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [src, name, type, enabled]);
  return enabled && prepared?.src === src ? prepared.file : null;
}

function ShareImageModal(props: Props) {
  const { open, onClose, path, slug, url, title, language, umamiSuffix } = props;
  const locales = useMemo(() => withLocales(language), [language]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [formatId, setFormatId] = useState<FormatId>('9x16');
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const { isCopied, copyHandler } = useClipboard(url);

  const format = SHARE_IMAGE_FORMATS.find((item) => item.id === formatId) ?? SHARE_IMAGE_FORMATS[0];
  const src = `/${path}/${format.file}`;
  const fileName = `${slug}-${format.id}.${format.type === 'image/png' ? 'png' : 'jpg'}`;
  const file = usePreparedFile(src, fileName, format.type, open);
  const loaded = loadedSrc === src;

  // showModal() gives the top layer, inert background, Esc to close and focus return
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const onShare = () => {
    if (!file) return;
    navigator.share({ files: [file], title }).catch(() => undefined);
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal modal-bottom sm:modal-middle motion-reduce:transition-none"
      aria-labelledby="share-image-title"
      onClose={onClose}
    >
      <div className="modal-box bg-base-100 border border-[var(--gd-line)] shadow-2xl max-w-lg p-5 sm:p-6 motion-reduce:transition-none motion-reduce:animate-none">
        <div className="flex items-center justify-between gap-3">
          <h3 id="share-image-title" className="text-lg font-semibold">
            {locales.title}
          </h3>
          <button type="button" className="btn btn-ghost btn-sm btn-circle" aria-label={locales.close} onClick={onClose}>
            <X className="w-5 h-5" aria-hidden />
          </button>
        </div>

        <div role="radiogroup" aria-label={locales.size} className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SHARE_IMAGE_FORMATS.map((item) => {
            const active = item.id === formatId;
            return (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setFormatId(item.id)}
                data-umami-event={`content_share-image-size-${item.id}_${umamiSuffix}`}
                className={cn([
                  'btn btn-sm font-medium border',
                  active ? 'btn-primary' : 'btn-ghost border-[var(--gd-line)]'
                ])}
              >
                {locales[item.id]}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex justify-center">
          <div
            className="relative overflow-hidden rounded-xl border border-[var(--gd-line)] bg-base-200 w-full"
            style={{
              aspectRatio: `${format.width} / ${format.height}`,
              // tall formats are capped by height so the buttons stay on screen
              maxWidth: `min(100%, calc(48vh * ${format.width} / ${format.height}))`
            }}
          >
            {!loaded && <div className="absolute inset-0 skeleton rounded-none motion-reduce:animate-none" aria-hidden />}
            {open && (
              // eslint-disable-next-line @next/next/no-img-element -- static export, the file is already optimised
              <img
                key={src}
                src={src}
                alt={`${locales.preview}: ${title}`}
                width={format.width}
                height={format.height}
                loading="lazy"
                decoding="async"
                onLoad={() => setLoadedSrc(src)}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        <div className={cn(['mt-4 grid gap-2', file ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2'])}>
          <a
            href={src}
            download={fileName}
            className="btn btn-primary whitespace-nowrap"
            data-umami-event={`content_share-image-download-${format.id}_${umamiSuffix}`}
          >
            <Download className="w-4 h-4" aria-hidden />
            {locales.download}
          </a>
          {file && (
            <button
              type="button"
              onClick={onShare}
              className="btn btn-outline whitespace-nowrap"
              data-umami-event={`content_share-image-share-${format.id}_${umamiSuffix}`}
            >
              <Share2 className="w-4 h-4" aria-hidden />
              {locales.share}
            </button>
          )}
          <button
            type="button"
            onClick={copyHandler}
            className={cn([
              'btn whitespace-nowrap',
              file && 'col-span-2 sm:col-span-1',
              isCopied ? 'btn-success' : 'btn-ghost border border-[var(--gd-line)]'
            ])}
            data-umami-event={`content_share-image-copy-link_${umamiSuffix}`}
          >
            {isCopied ? <Check className="w-4 h-4" aria-hidden /> : <LinkIcon className="w-4 h-4" aria-hidden />}
            {isCopied ? locales.copied : locales.copy}
          </button>
        </div>
        <p className="mt-2 text-xs text-muted text-center">{locales.hint}</p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit" tabIndex={-1} aria-label={locales.close}>close</button>
      </form>
    </dialog>
  );
}

export default ShareImageModal;
