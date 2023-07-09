import { useTranslations } from 'next-intl';

function HomePage() {
  const t = useTranslations('home');
  return (
    <div>
      Hello {t('title')}
    </div>
  );
}

export default HomePage;
