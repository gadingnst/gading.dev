import HomePage, { generateHomePathsDefault } from '@/modules/Home/Home.page';

export const generateStaticParams = generateHomePathsDefault;

function RootHomePage() {
  return <HomePage params={{}} />;
}

export default RootHomePage;
