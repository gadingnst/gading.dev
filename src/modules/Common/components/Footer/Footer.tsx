'use client';

import { Facebook, Github, Instagram, Linkedin, Twitter } from 'lucide-react';

import {
  AUTHOR_FACEBOOK,
  AUTHOR_GITHUB,
  AUTHOR_INSTAGRAM,
  AUTHOR_LINKEDIN,
  AUTHOR_NAME,
  AUTHOR_TWITTER
} from '@/configs/author';
import { BASE_URL, SITE_NAME } from '@/configs/sites';
import cn from '@/designs/utils/cn';
import { Link } from '@/packages/components/base/Navigations';

const currentYear = new Date().getFullYear();

const socialLinks = [
  {
    name: 'GitHub',
    href: `https://github.com/${AUTHOR_GITHUB}`,
    icon: Github,
    className: 'bg-[#333]'
  },
  {
    name: 'Twitter',
    href: `https://twitter.com/${AUTHOR_TWITTER}`,
    icon: Twitter,
    className: 'bg-[#1DA1F2]'
  },
  {
    name: 'Instagram',
    href: `https://instagram.com/${AUTHOR_INSTAGRAM}`,
    icon: Instagram,
    className: 'bg-gradient-to-r from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888]'
  },
  {
    name: 'LinkedIn',
    href: `https://linkedin.com/in/${AUTHOR_LINKEDIN}`,
    icon: Linkedin,
    className: 'bg-[#0077B5]'
  },
  {
    name: 'Facebook',
    href: `https://facebook.com/${AUTHOR_FACEBOOK}`,
    icon: Facebook,
    className: 'bg-[#1877F2]'
  }
];

function Footer() {
  return (
    <footer className="footer-custom w-full h-full">
      <div className="base-container">
        <div className="relative z-10 flex my-16 flex-col justify-between lg:items-center lg:flex-row">
          <p className="text-2xl text-left mx-1">
          Let&lsquo;s get in touch on my social.
          </p>
          <div className="flex gap-x-3 my-4 lg:my-0">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn([
                  'p-2 rounded-lg text-white hover:text-white hover-float-1',
                  social.className
                ])}
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>
        <hr className="relative z-10" />
        <div className="relative z-10 my-12 text-sm text-center sm:text-left">
          <span className="inline-block">&copy;&nbsp;{currentYear}&nbsp;</span>
          <Link className="inline-block font-semibold" href={BASE_URL}>{SITE_NAME}</Link>
          <span className="inline-block mx-1">&bull;</span>
          <Link className="inline-block mx-0.5" href={`https://github.com/${AUTHOR_GITHUB}/gading.dev`}>Built</Link>
          <span className="inline-block mx-0.5">with</span>
          <span className="inline-block border-b-2 border-dotted mx-0.5 leading-tight">Bullshit</span>
          <span className="inline-block mx-0.5">by</span>
          <Link className="inline-block text-primary mx-0.5" href={`https://github.com/${AUTHOR_GITHUB}`}>
            {AUTHOR_NAME}
          </Link>
          <div className="text-base-content mt-2">
            <Link className="inline-block text-primary" href="/docs/colors">
              Colors System
            </Link>
            <span className="inline-block mx-1">&bull;</span>
            <Link className="inline-block text-primary" href={`${BASE_URL}/rss/feed.xml`}>
              Feed RSS
            </Link>
            <span className="inline-block mx-1">&bull;</span>
            <Link className="inline-block text-primary" href={`${BASE_URL}/sitemap.xml`}>
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
