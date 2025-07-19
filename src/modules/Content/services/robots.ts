import { MetadataRoute } from 'next';

import { BASE_URL } from '@/configs/sites';

function generateRobots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    host: BASE_URL,
    sitemap: `${BASE_URL}/sitemap.xml`
  };
}

export default generateRobots;
