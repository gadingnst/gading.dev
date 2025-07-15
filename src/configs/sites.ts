import { NODE_ENV } from './envs';

export const IS_DEV = NODE_ENV !== 'production';

export const SITE_NAME = 'Gading\'s Hideout';
export const PRODUCTION_URL = 'https://gading.dev';
export const BASE_URL = IS_DEV ? 'http://localhost:3000' : PRODUCTION_URL;
export const DEFAULT_LOCALE = 'en';
export const BLOG_PAGINATION_LIMIT = 10;

export const GOOGLE_VERIFICATION_ID = 'eGOhdZjNeSLIBtMneyjMwoE3fg4c4';
export const ANALYTICS_ID = '2cbe653a-beab-45ef-81d2-ebb51c23cf13';
export const DISQUS_SHORTNAME = 'gadingnst';
export const CLOUDINARY_CLOUD_NAME = 'gadingnst';
