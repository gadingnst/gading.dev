import type { FunctionComponent } from 'react';
import { Link, Button, SVG } from '@/components/base';
import {
  AUTHOR_NAME,
  AUTHOR_FACEBOOK,
  AUTHOR_GITHUB,
  AUTHOR_INSTAGRAM,
  AUTHOR_LINKEDIN,
  AUTHOR_TWITTER,
  AUTHOR_STEAM,
  BASE_URL,
  SITE_NAME
} from '@/utils/config';
import clsxm from '@/utils/helpers/clsxm';
import styles from './styles.module.css';

import IconGithub from '$/assets/icons/logo/octocat.svg';
import IconLinkedin from '$/assets/icons/logo/linkedin.svg';
import IconInstagram from '$/assets/icons/logo/instagram.svg';
import IconFacebook from '$/assets/icons/logo/facebook.svg';
import IconTwitter from '$/assets/icons/logo/twitter.svg';
import IconSteam from '$/assets/icons/logo/steam.svg';

export interface Props {
  className?: string;
}

const socialLinks = [
  {
    color: 'bg-github dark:hover:shadow-light',
    logo: IconGithub,
    url: `https://github.com/${AUTHOR_GITHUB}`
  },
  {
    color: 'bg-linkedin dark:hover:shadow-linkedin',
    logo: IconLinkedin,
    url: `https://linkedin.com/in/${AUTHOR_LINKEDIN}`
  },
  {
    color: 'bg-instagram dark:hover:shadow-instagram',
    logo: IconInstagram,
    url: `https://instagram.com/${AUTHOR_INSTAGRAM}`
  },
  {
    color: 'bg-facebook dark:hover:shadow-facebook',
    logo: IconFacebook,
    url: `https://facebook.com/${AUTHOR_FACEBOOK}`
  },
  {
    color: 'bg-twitter dark:hover:shadow-twitter',
    logo: IconTwitter,
    url: `https://twitter.com/${AUTHOR_TWITTER}`
  },
  {
    color: 'bg-steam dark:hover:shadow-steam',
    logo: IconSteam,
    url: `https://steamcommunity.com/id/${AUTHOR_STEAM}`
  }
];

const Footer: FunctionComponent<Props> = (props) => {
  const { className } = props;
  return (
    <footer className={clsxm('w-full h-full', className, styles.footer)}>
      <div className="flex container mx-auto my-64 flex-col justify-between lg:items-center lg:max-w-5xl lg:flex-row">
        <p className="text-2xl text-left mx-4">
          Let&lsquo;s get in touch on my social.
        </p>
        <div className="flex flex-wrap items-center my-20 lg:my-0">
          {socialLinks.map((socialLink) => (
            <Button
              disableHover
              key={socialLink.url}
              href={socialLink.url}
              delay={300}
              className={`${socialLink.color} shadow-lg rounded-8 p-12 mx-4 my-4 hover:-translate-y-4 hover:scale-105`}
            >
              <SVG fill="white" size={14} src={socialLink.logo} />
            </Button>
          ))}
        </div>
      </div>
      <hr className="container lg:max-w-5xl" />
      <div className="container w-full mx-auto my-48 text-sm text-center lg:max-w-5xl sm:text-left">
        <span className="inline-block">&copy;&nbsp;{new Date().getFullYear()}&nbsp;</span>
        <Link className="inline-block" href={BASE_URL}>{SITE_NAME}</Link>
        <span className="inline-block mx-4">&bull;</span>
        <Link className="inline-block mx-2" href={`https://github.com/${AUTHOR_GITHUB}/gading.dev`}>Built</Link>
        <span className="inline-block mx-2">with</span>
        <span className="inline-block util--underline-dotted mx-2">Bullshit</span>
        <span className="inline-block mx-2">by</span>
        <Link className="inline-block text-primary mx-2" href={`https://github.com/${AUTHOR_GITHUB}`}>
          {AUTHOR_NAME}
        </Link>
        <div className="dark:text-white mt-8">
          <Link className="inline-block text-primary" href="/docs/colors">
            Colors System
          </Link>
          <span className="inline-block mx-4">&bull;</span>
          <Link className="inline-block text-primary" href={`${BASE_URL}/rss/feed.xml`}>
            Feed RSS
          </Link>
          <span className="inline-block mx-4">&bull;</span>
          <Link className="inline-block text-primary" href={`${BASE_URL}/sitemap.xml`}>
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
};

Footer.defaultProps = {
  className: ''
};

export default Footer;
