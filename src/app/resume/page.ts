import ResumePage from '@/modules/Resume/Resume.page';
import dt from '@/packages/libs/DayJS/dt';
import { withGenerateMetadata } from '@/packages/utils/metadata/metadata';
import { metadataBuilder } from '@/packages/utils/metadata/metadata.builder';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateMetadata = withGenerateMetadata(async() => {
  return metadataBuilder({
    meta: {
      slug: '/resume',
      title: 'Gading\'s Resume',
      description: 'Gading\'s Resume',
      image: '/media/authhors/gading-talks.jpeg',
      date: dt().format('YYYY-MM-DD')
    }
  });
});

export default ResumePage;
