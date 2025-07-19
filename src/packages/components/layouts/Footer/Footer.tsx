import { AUTHOR_GITHUB, AUTHOR_NAME } from '@/configs/author';
import { BASE_URL, SITE_NAME } from '@/configs/sites';
import Link from '@/packages/components/base/Navigations/Link';
import SocialLinks from '@/packages/components/layouts/Footer/SocialLinks';

const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer-custom w-full h-full">
      <div className="base-container">
        <div className="relative z-10 flex my-16 flex-col justify-between lg:items-center lg:flex-row">
          <p className="text-2xl text-left mx-1">
            Let&lsquo;s get in touch on my social.
          </p>
          <SocialLinks />
        </div>
        <hr className="relative z-10" />
        <div className="relative z-10 my-12 text-sm text-center sm:text-left">
          <span className="inline-block">&copy;&nbsp;{currentYear}&nbsp;</span>
          <Link className="inline-block font-semibold" href={BASE_URL}>{SITE_NAME}</Link>
          <span className="inline-block mx-1">&bull;</span>
          <Link target="_blank" rel="noopener noreferrer" className="inline-block text-primary mx-0.5" href={`https://github.com/${AUTHOR_GITHUB}/gading.dev`}>Built</Link>
          <span className="inline-block mx-0.5">with</span>
          <span className="inline-block border-b-2 border-dotted mx-0.5 leading-tight">Bullshit</span>
          <span className="inline-block mx-0.5">by</span>
          <Link target="_blank" rel="noopener noreferrer" className="inline-block text-primary mx-0.5" href={`https://github.com/${AUTHOR_GITHUB}`}>
            {AUTHOR_NAME}
          </Link>
          <div className="text-base-content mt-2">
            <Link target="_blank" rel="noopener noreferrer" className="inline-block text-primary" href="https://eu.umami.is/share/ZCHEMPuhQlibZE6L/gading.dev">
              Analytic
            </Link>
            <span className="inline-block mx-1">&bull;</span>
            <Link target="_blank" rel="noopener noreferrer" className="inline-block text-primary" href="/docs/colors">
              Color System
            </Link>
            <span className="inline-block mx-1">&bull;</span>
            <Link target="_blank" rel="noopener noreferrer" className="inline-block text-primary" href={`${BASE_URL}/rss/feed.xml`}>
              Feed RSS
            </Link>
            <span className="inline-block mx-1">&bull;</span>
            <Link target="_blank" rel="noopener noreferrer" className="inline-block text-primary" href={`${BASE_URL}/sitemap.xml`}>
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
