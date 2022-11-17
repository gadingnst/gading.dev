/** Process ENV */
export const SECRET_KEY = process.env.SECRET_KEY;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

/** NEXT_PUBLIC Process ENV */
export const APP_ENVIRONMENT = process.env.NEXT_PUBLIC_APP_ENVIRONMENT || 'production';

/** Custom ENV */
export const IS_DEV = APP_ENVIRONMENT !== 'production';

/* Site Information */
export const SITE_NAME = 'Gading\'s Hideout';
export const PRODUCTION_URL = 'https://gading.dev';
export const BASE_URL = IS_DEV ? 'http://localhost:3000' : PRODUCTION_URL;
export const DEFAULT_LOCALE = 'en';
export const ANALYTICS_ID = '4378cf7b-8ecb-441a-a1e5-25008dc7f232';
export const BLOG_PAGINATION_LIMIT = 6;
export const DISQUS_SHORTNAME = 'gadingnst';
export const CLOUDINARY_CLOUD_NAME = 'gadingnst';

/* Author Information */
export const AUTHOR_NAME = 'Gading Nasution.';
export const AUTHOR_FULLNAME = 'Sutan Gading Fadhillah Nasution';
export const AUTHOR_EMAIL = 'contact@gading.dev';
export const AUTHOR_FACEBOOK = 'gadingnstn';
export const AUTHOR_TWITTER = 'gadingnstn';
export const AUTHOR_INSTAGRAM = 'gadingnst';
export const AUTHOR_GITHUB = 'gadingnst';
export const AUTHOR_LINKEDIN = 'gadingnst';
export const AUTHOR_STEAM = 'gadingnst';
