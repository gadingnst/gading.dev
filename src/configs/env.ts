/** Main ENV */
/** @see https://nextjs.org/docs/basic-features/environment-variables#loading-environment-variables */
export const NODE_ENV = process.env.NODE_ENV || 'production';
export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const SECRET_APP_KEY = process.env.SECRET_APP_KEY;
export const SECRET_KEY = process.env.SECRET_KEY;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const CLOUDINARY_CLOUD_NAME = 'gadingnst';

/** NEXT_PUBLIC ENV */

/** Custom ENV */
export const IS_DEV = NODE_ENV !== 'production';

/* Site Settings */
export const SITE_NAME = 'Gading\'s Hideout';
export const PRODUCTION_URL = 'https://gading.dev';
export const BASE_URL = IS_DEV ? 'http://localhost:3000' : PRODUCTION_URL;
export const ANALYTICS_ID = '4378cf7b-8ecb-441a-a1e5-25008dc7f232';
export const DISQUS_SHORTNAME = 'gadingnst';
export const DEFAULT_LOCALE = 'en';
export const BLOG_PAGINATION_LIMIT = 6;
