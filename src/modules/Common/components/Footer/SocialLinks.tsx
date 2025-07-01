import {
  AUTHOR_FACEBOOK,
  AUTHOR_GITHUB,
  AUTHOR_INSTAGRAM,
  AUTHOR_LINKEDIN,
  AUTHOR_TWITTER
} from '@/configs/author';
import IconFacebook from '@/designs/icons/logo/facebook.svg';
import IconGithub from '@/designs/icons/logo/github.svg';
import IconInstagram from '@/designs/icons/logo/instagram.svg';
import IconLinkedin from '@/designs/icons/logo/linkedin.svg';
import IconTwitter from '@/designs/icons/logo/twitter.svg';
import cn from '@/designs/utils/cn';
import { Link } from '@/packages/components/base';

const socialLinks = [
  {
    name: 'GitHub',
    href: `https://github.com/${AUTHOR_GITHUB}`,
    icon: IconGithub,
    className: 'bg-[#333] shadow-gray-600'
  },
  {
    name: 'Twitter',
    href: `https://twitter.com/${AUTHOR_TWITTER}`,
    icon: IconTwitter,
    className: 'bg-[#1DA1F2] shadow-blue-400'
  },
  {
    name: 'Instagram',
    href: `https://instagram.com/${AUTHOR_INSTAGRAM}`,
    icon: IconInstagram,
    className: 'bg-gradient-to-r from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] shadow-pink-500'
  },
  {
    name: 'LinkedIn',
    href: `https://linkedin.com/in/${AUTHOR_LINKEDIN}`,
    icon: IconLinkedin,
    className: 'bg-[#0077B5] shadow-blue-600'
  },
  {
    name: 'Facebook',
    href: `https://facebook.com/${AUTHOR_FACEBOOK}`,
    icon: IconFacebook,
    className: 'bg-[#1877F2] shadow-blue-500'
  }
];

function SocialLinks() {
  return (
    <div className="flex gap-x-3 my-4 lg:my-0">
      {socialLinks.map((social) => (
        <Link
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn([
            'p-3 rounded-lg text-white hover:text-white hover:-translate-y-1 hover:shadow-lg',
            social.className
          ])}
          aria-label={social.name}
        >
          <social.icon className="w-4 h-4 text-white" />
        </Link>
      ))}
    </div>
  );
}

export default SocialLinks;
