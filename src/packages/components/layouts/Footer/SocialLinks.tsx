import {
  // AUTHOR_FACEBOOK,
  AUTHOR_GITHUB,
  // AUTHOR_INSTAGRAM,
  AUTHOR_LINKEDIN,
  AUTHOR_THREADS,
  AUTHOR_TWITTER
} from '@/configs/author';
import IconFacebook from '@/designs/icons/logo/facebook.svg';
import IconGithub from '@/designs/icons/logo/github.svg';
import IconInstagram from '@/designs/icons/logo/instagram.svg';
import IconLinkedin from '@/designs/icons/logo/linkedin.svg';
import IconThreads from '@/designs/icons/logo/threads.svg';
import IconTwitter from '@/designs/icons/logo/twitter.svg';
import cn from '@/designs/utils/cn';
import Link from '@/packages/components/base/Navigations/Link';
import { dasherize } from '@/packages/utils/helpers/string';

const socialLinks = [
  {
    name: 'GitHub',
    href: `https://github.com/${AUTHOR_GITHUB}`,
    icon: IconGithub
  },
  /* {
    name: 'Instagram',
    href: `https://instagram.com/${AUTHOR_INSTAGRAM}`,
    icon: IconInstagram,
    className: 'bg-gradient-to-r from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] shadow-pink-500'
  }, */
  {
    name: 'LinkedIn',
    href: `https://linkedin.com/in/${AUTHOR_LINKEDIN}`,
    icon: IconLinkedin
  },
  {
    name: 'Twitter',
    href: `https://x.com/${AUTHOR_TWITTER}`,
    icon: IconTwitter
  },
  {
    name: 'Threads',
    href: `https://threads.net/@${AUTHOR_THREADS}`,
    icon: IconThreads
  }
  /* {
    name: 'Facebook',
    href: `https://facebook.com/${AUTHOR_FACEBOOK}`,
    icon: IconFacebook,
    className: 'bg-[#1877F2] shadow-blue-500'
  } */
];

function SocialLinks() {
  return (
    <div className="flex justify-center gap-x-3">
      {socialLinks.map((social) => (
        <Link
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          data-umami-event={`footer_social-link_${dasherize(social.name)}`}
          className={cn([
            'grid h-10 w-10 place-items-center rounded-full bg-card text-base-content shadow-soft',
            'transition-all duration-200 hover:-translate-y-0.5 hover:text-brand'
          ])}
        >
          <social.icon className="h-4 w-4" />
        </Link>
      ))}
    </div>
  );
}

export default SocialLinks;
