import { Suspense } from 'react';

import { type NextPageProps } from '@/@types/global';
import AboutWrapper from '@/modules/About/components/AboutWrapper.client';
import JokeList from '@/modules/Joke/components/JokeList';
import { getLocale } from '@/packages/utils/i18n';

function AboutPage(props: NextPageProps) {
  const { searchParams, params } = props;
  getLocale(params);

  return (
    <AboutWrapper searchParams={searchParams}>
      {/* Exampe calling Server Component inside Client Component with Suspense */}
      <Suspense fallback={<p className="text-center">Loading...</p>}>
        <JokeList />
      </Suspense>
    </AboutWrapper>
  );
}

export default AboutPage;
