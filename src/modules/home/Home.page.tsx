import { useTranslations } from 'next-intl';

function HomePage() {
  const t = useTranslations('home');
  return (
    <div className="base-container">
      Hello {t('title')}
    </div>
  );
}

export default HomePage;
