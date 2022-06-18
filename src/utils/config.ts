process.env;

export const {
  SECRET_KEY,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
  NEXT_PUBLIC_APP_ENVIRONMENT: APP_ENVIRONMENT = 'production'
} = process.env;

export const IS_DEV = APP_ENVIRONMENT !== 'production';

/* Site Information */
export const SITE_NAME = 'Gading\'s Hideout';
export const BASE_URL = IS_DEV ? 'http://localhost:3000' : 'https://gading.dev';
export const DEFAULT_LOCALE = 'en';
export const ANALYTICS_ID = '4378cf7b-8ecb-441a-a1e5-25008dc7f232';
export const BLOG_PAGINATION_LIMIT = 6;
export const DISQUS_SHORTNAME = 'sutanlab';
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
