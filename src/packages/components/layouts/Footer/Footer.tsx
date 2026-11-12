import { AUTHOR_GITHUB, AUTHOR_NAME } from '@/configs/author';
import { BASE_URL, SITE_NAME } from '@/configs/sites';
import Link from '@/packages/components/base/Navigations/Link';
import SocialLinks from '@/packages/components/layouts/Footer/SocialLinks';

const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer-custom w-full">
      <div className="wide-container pb-12 pt-16 text-center text-sm text-muted">
        <span className="font-hand text-[22px] text-brand">thanks for stopping by ✌️</span>
        <code className="mt-1.5 block font-mono text-[13px]">gading@palembang:~$ exit</code>

        <div className="mt-8">
          <SocialLinks />
        </div>

        <div className="mt-8">
          <span className="inline-block">&copy;&nbsp;{currentYear}&nbsp;</span>
          <Link size="inherit" className="inline-block font-semibold" href={BASE_URL}>{SITE_NAME}</Link>
          <span className="mx-1 inline-block">&bull;</span>
          <Link size="inherit" target="_blank" rel="noopener noreferrer" className="inline-block text-primary mx-0.5" href={`https://github.com/${AUTHOR_GITHUB}/gading.dev`}>Built</Link>
          <span className="mx-0.5 inline-block">with</span>
          <span className="mx-0.5 inline-block border-b-2 border-dotted leading-tight">Bullshit</span>
          <span className="mx-0.5 inline-block">by</span>
          <Link size="inherit" target="_blank" rel="noopener noreferrer" className="inline-block text-primary mx-0.5" href={`https://github.com/${AUTHOR_GITHUB}`}>
            {AUTHOR_NAME}
          </Link>
          <div className="mt-2">
            <Link size="inherit" target="_blank" rel="noopener noreferrer" className="inline-block text-primary" href="https://analytic.gading.dev">
              Analytic
            </Link>
            <span className="mx-1 inline-block">&bull;</span>
            <Link size="inherit" target="_blank" rel="noopener noreferrer" className="inline-block text-primary" href="/docs/colors">
              Color System
            </Link>
            <span className="mx-1 inline-block">&bull;</span>
            <a target="_blank" rel="noopener noreferrer" className="inline-block text-primary" href={`${BASE_URL}/rss/feed.xml`}>
              Feed RSS
            </a>
            <span className="mx-1 inline-block">&bull;</span>
            <a target="_blank" rel="noopener noreferrer" className="inline-block text-primary" href={`${BASE_URL}/sitemap.xml`}>
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
