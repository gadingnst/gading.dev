import { FunctionComponent, useCallback, useMemo } from 'react';
import { Button, SVG } from '@/components/base';
import { I18nLocales } from '@/types/contents';
import { AUTHOR_TWITTER, BASE_URL } from '@/utils/config';
import { ContentMeta } from '@/server/content-parser';
import createPopUp from '@/utils/helpers/popup';

import IconFacebook from '$/assets/icons/logo/facebook.svg';
import IconLinkedin from '$/assets/icons/logo/linkedin.svg';
import IconTwitter from '$/assets/icons/logo/twitter.svg';
import IconTumblr from '$/assets/icons/logo/tumblr.svg';
import IconWhatsapp from '$/assets/icons/logo/whatsapp.svg';
import IconTelegram from '$/assets/icons/logo/telegram.svg';
import createContentLocales from '@/utils/helpers/locales';

interface Props {
  path: string;
  meta: ContentMeta;
  locale: I18nLocales|string;
}

type SocialShare = {
  color: string;
  label: string;
  logo: any;
};

const socialShares: SocialShare[] = [
  {
    color: 'bg-facebook dark:hover:shadow-facebook',
    label: 'Share on Facebook',
    logo: IconFacebook
  },
  {
    color: 'bg-linkedin dark:hover:shadow-linkedin',
    label: 'Share on Linkedin',
    logo: IconLinkedin
  },
  {
    color: 'bg-twitter dark:hover:shadow-twitter',
    logo: IconTwitter,
    label: 'Share on Twitter'
  },
  {
    color: 'bg-tumblr dark:hover:shadow-tumblr',
    logo: IconTumblr,
    label: 'Share on Tumblr'
  },
  {
    color: 'bg-whatsapp dark:hover:shadow-whatsapp',
    logo: IconWhatsapp,
    label: 'Share on Whatsapp'
  },
  {
    color: 'bg-telegram dark:hover:shadow-telegram',
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

const btnShareClasses = 'shadow-lg rounded-full p-12 mx-4 mb-12 hover:-mt-8 hover:scale-105';

const Share: FunctionComponent<Props> = (props) => {
  const { path, meta, locale } = props;
  const { title, description, tags } = meta;

  const locales = useMemo(() => withLocales(locale), [locale]);

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
  }, [path]);

  const onShare = useCallback((social: SocialShare) => () => {
    const socialId = social.label.substring(9).toLocaleLowerCase();
    const shareUrl = (socialShareUrl as any)[socialId] || null;
    if (shareUrl) {
      createPopUp({
        url: shareUrl,
        title: social.label,
        w: 600,
        h: 600
      });
    }
    return false;
  }, [socialShareUrl]);

  return (
    <div className="mt-40">
      <h4 className="text-center mb-12">
        {locales.share}
      </h4>
      <div className="relative flex justify-center items-center flex-wrap">
        {socialShares.map((social) => (
          <Button
            disableHover
            key={social.label}
            onClick={onShare(social)}
            delay={300}
            className={`${social.color} ${btnShareClasses} umami--click--share-${social.label.substring(9).toLocaleLowerCase()}`}
          >
            <SVG fill="white" size={24} src={social.logo} />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Share;
