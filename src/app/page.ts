import HomePage, { generateHomePathsDefault } from '@/modules/Home/Home.page';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = generateHomePathsDefault;

export default HomePage;
