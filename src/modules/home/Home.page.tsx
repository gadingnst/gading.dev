import { useTranslations } from 'next-intl';

function HomePage() {
  const t = useTranslations('home');
  return (
    <div className="base-container">
      <div className="py-5">
        Hello {t('title')}
      </div>
    </div>
  );
}

export default HomePage;
