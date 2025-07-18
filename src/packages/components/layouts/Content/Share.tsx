'use client';

import { FunctionComponent, SVGProps, useCallback, useMemo } from 'react';

import { AUTHOR_TWITTER } from '@/configs/author';
import { BASE_URL } from '@/configs/sites';
import IconFacebook from '@/designs/icons/logo/facebook.svg';
import IconLinkedin from '@/designs/icons/logo/linkedin.svg';
import IconTelegram from '@/designs/icons/logo/telegram.svg';
import IconTumblr from '@/designs/icons/logo/tumblr.svg';
import IconTwitter from '@/designs/icons/logo/twitter.svg';
import IconWhatsapp from '@/designs/icons/logo/whatsapp.svg';
import cn from '@/designs/utils/cn';
import { ContentMeta } from '@/modules/ContentParser/services/content-parser';
import Button from '@/packages/components/base/Buttons/Button';
import useLangugage from '@/packages/libs/I18n/i18n.client';
import createContentLocales from '@/packages/libs/I18n/locales';
import createPopup from '@/packages/utils/helpers/createPopup';
import { dasherize } from '@/packages/utils/helpers/string';

interface Props {
  path: string;
  meta: ContentMeta;
}

interface SocialShare {
  color: string;
  label: string;
  logo: FunctionComponent<SVGProps<SVGSVGElement>>;
};

const socialShares: SocialShare[] = [
  {
    color: 'bg-[#1877F2] shadow-blue-500',
    label: 'Share on Facebook',
    logo: IconFacebook
  },
  {
    color: 'bg-[#0077B5] shadow-blue-600',
    label: 'Share on Linkedin',
    logo: IconLinkedin
  },
  {
    color: 'bg-[#1DA1F2] shadow-blue-400',
    logo: IconTwitter,
    label: 'Share on Twitter'
  },
  {
    color: 'bg-[#36465D] shadow-gray-700',
    logo: IconTumblr,
    label: 'Share on Tumblr'
  },
  {
    color: 'bg-[#25D366] shadow-green-500',
    logo: IconWhatsapp,
    label: 'Share on Whatsapp'
  },
  {
    color: 'bg-[#26A5E4] shadow-sky-500',
    logo: IconTelegram,
    label: 'Share on Telegram'
  }
];

const withLocales = createContentLocales({
  share: {
    en: 'Share',
    id: 'Bagikan'
  }
});

function ContentShare(props: Props) {
  const { path, meta } = props;
  const { title, description, tags = [] } = meta;

  const language = useLangugage();
  const locales = useMemo(() => withLocales(language), [language]);

  const socialShareUrl = useMemo(() => {
    const url = `${BASE_URL}/${path}`;
    const encodedDesc = encodeURIComponent(description);
    const encodedTitle = encodeURIComponent(title);
    const hastags = tags.reduce((acc, cur) => `${acc}%23${cur.replace(/\s+/g, '_')} `, '').trim();
    return {
      'facebook': `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=%22${encodedDesc}%22%0A%0A${tags}`,
      'linkedin': `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      'twitter': `https://twitter.com/intent/tweet?text=%22${encodedDesc}%22%20${url}%20via%20%40${AUTHOR_TWITTER}%0A%0A${hastags}`,
      'tumblr': `https://www.tumblr.com/widgets/share/tool/preview?posttype=link&canonicalUrl=${url}&title=${encodedTitle}&caption=${encodedDesc}`,
      'whatsapp': `https://api.whatsapp.com/send?text=%22${encodedDesc}%22%0A%0A${url}`,
      'telegram': `https://telegram.me/share/url?url=${url}&text=%0A%22${encodedDesc}%22`
    };
  }, [description, path, tags, title]);

  const onShare = useCallback((social: SocialShare) => () => {
    const socialId = social.label.substring(9).toLocaleLowerCase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const shareUrl = (socialShareUrl as any)[socialId] || null;
    if (shareUrl) {
      createPopup({
        url: shareUrl,
        title: social.label,
        w: 600,
        h: 600
      });
    }
    return false;
  }, [socialShareUrl]);

  return (
    <div className="mt-10">
      <h4 className="text-center font-semibold mb-3">
        {locales.share}
      </h4>
      <div className="relative flex justify-center items-center flex-wrap gap-2">
        {socialShares.map((social) => (
          <Button
            label={`Button to ${social.label}`}
            key={social.label}
            onClick={onShare(social)}
            data-umami-event={`content_share-${dasherize(social.label.substring(9))}_${dasherize(path.replace(/\//g, '-'))}`}
            className={cn([
              social.color,
              'btn-circle btn-lg text-white shadow-none outline-0 border-0 hover:-translate-y-1 hover:shadow-lg'
            ])}
          >
            <social.logo className="w-6 h-6 text-white" />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ContentShare;
