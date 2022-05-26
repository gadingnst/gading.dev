import { FunctionComponent } from 'react';
import { Link, Button } from '@/components';
import {
  AUTHOR_NAME,
  FACEBOOK_USERNAME,
  GITHUB_USERNAME,
  INSTAGRAM_USERNAME,
  LINKEDIN_USERNAME,
  PRODUCTION_URL,
  SITE_NAME,
  TWITTER_USERNAME
} from '@/utils/config';
import clsxm from '@/utils/helpers/clsxm';
import styles from './styles.module.css';
import Icon from '../Image/Icon';

import iconGithub from '@/assets/icons/logo/octocat.svg';
import iconLinkedin from '@/assets/icons/logo/linkedin.svg';
import iconInstagram from '@/assets/icons/logo/instagram.svg';
import iconFacebook from '@/assets/icons/logo/facebook.svg';
import iconTwitter from '@/assets/icons/logo/twitter.svg';

export interface Props {
  className?: string;
}

const socialLinks = [
  {
    color: 'bg-github',
    logo: iconGithub,
    url: `https://github.com/${GITHUB_USERNAME}`
  },
  {
    color: 'bg-linkedin',
    logo: iconLinkedin,
    url: `https://linkedin.com/in/${LINKEDIN_USERNAME}`
  },
  {
    color: 'bg-instagram',
    logo: iconInstagram,
    url: `https://instagram.com/${INSTAGRAM_USERNAME}`
  },
  {
    color: 'bg-facebook',
    logo: iconFacebook,
    url: `https://facebook.com/${FACEBOOK_USERNAME}`
  },
  {
    color: 'bg-twitter',
    logo: iconTwitter,
    url: `https://twitter.com/${TWITTER_USERNAME}`
  }
];

const Footer: FunctionComponent<Props> = (props) => {
  const { className } = props;
  return (
    <footer className={clsxm('w-full h-full', className, styles.footer)}>
      <div className="flex container mx-auto my-64 flex-col justify-between lg:max-w-5xl lg:flex-row">
        <p className="text-2xl text-left">
          Let&lsquo;s get in touch on my social.
        </p>
        <div className="flex items-center relative h-full my-24 lg:my-0">
          {socialLinks.map((socialLink) => (
            <Button
              key={socialLink.url}
              href={socialLink.url}
              className={`${socialLink.color} shadow-all rounded-8 px-[11px] py-[6px] mx-4 hover:-mt-8`}
            >
              <Icon color="white" size={14} src={socialLink.logo} className="-mt-4" />
            </Button>
          ))}
        </div>
      </div>
      <hr className="container lg:max-w-5xl" />
      <div className="container w-full mx-auto my-48 text-sm max-w-5xl">
        <span className="inline-block">&copy;&nbsp;{new Date().getFullYear()}&nbsp;</span>
        <Link className="inline-block" href={PRODUCTION_URL}>{SITE_NAME}</Link>
        <span className="inline-block">&nbsp;&bull;&nbsp;</span>
        <Link className="inline-block" href={`https://github.com/${GITHUB_USERNAME}/gading.dev`}>Built</Link>
        <span className="inline-block">&nbsp;with&nbsp;</span>
        <span className="inline-block util--underline-dotted">Bullshit</span>
        <span className="inline-block">&nbsp;by&nbsp;</span>
        <Link className="inline-block text-primary" href={`https://github.com/${GITHUB_USERNAME}`}>
          {AUTHOR_NAME}
        </Link>
        <div className="-ml-4 dark:text-white">
          <span className="inline-block">&nbsp;See colors system&nbsp;</span>
          <Link className="inline-block text-primary" href="/docs/colors">
            here.
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
