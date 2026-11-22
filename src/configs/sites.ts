import { NODE_ENV } from './envs';

export const IS_DEV = NODE_ENV !== 'production';

export const SITE_NAME = 'Halo Syahrul';
/** text of the logo in the header */
export const SITE_DOMAIN = 'halosyahrul.com';
export const PRODUCTION_URL = 'https://halosyahrul.com';
export const BASE_URL = IS_DEV ? 'http://localhost:3000' : PRODUCTION_URL;
export const DEFAULT_LOCALE = 'en';
export const BLOG_PAGINATION_LIMIT = 10;

/** third-party IDs; an empty one turns that feature off */
export const GOOGLE_VERIFICATION_ID = '';
/** umami website ID */
export const ANALYTICS_ID = '';
export const DISQUS_SHORTNAME = '';
/** only used by the manual `npm run cloudinary:sync` script */
export const CLOUDINARY_CLOUD_NAME = '';
