/* eslint-disable no-console */

import xml2js from 'xml2js';

import { SECRET_APP_KEY } from '@/configs/envs';
import { BASE_URL } from '@/configs/sites';

const xmlParser = new xml2js.Parser();

/**
 * On Demand Revalidation trigger from sitemap.xml
 * @returns {Promise<void>}
 */
async function revalidate<T extends string>(): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/sitemap.xml`);
    const sitemap = await response.text();
    const data = await xmlParser.parseStringPromise(sitemap);
    const paths: string[] = data.urlset.url.map((url: Record<string, T[]>) => {
      const path: string = url.loc[0];
      return path.slice(BASE_URL.length) || '/';
    });
    await fetch(`${BASE_URL}/api/revalidate?key=${SECRET_APP_KEY}&path=${paths.join(',')}`)
      .then(res => res.json())
      .then(console.info);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

revalidate();
