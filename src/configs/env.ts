/** Process ENV */
export const SECRET_KEY = process.env.SECRET_KEY;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

/** NEXT_PUBLIC Process ENV */
export const APP_ENVIRONMENT = process.env.NEXT_PUBLIC_APP_ENVIRONMENT || 'production';

/** Custom ENV */
export const IS_DEV = APP_ENVIRONMENT !== 'production';

/* Site Information */
export const SITE_NAME = 'Minh Dan';
export const PRODUCTION_URL = 'https://nmdan.com';
export const BASE_URL = IS_DEV ? 'http://localhost:3000' : PRODUCTION_URL;
export const DEFAULT_LOCALE = 'en';
export const ANALYTICS_ID = '4378cf7b-8ecb-441a-a1e5-25008dc7f232';
export const BLOG_PAGINATION_LIMIT = 12;
export const DISQUS_SHORTNAME = 'disqus_lTimeFHo0C';
export const CLOUDINARY_CLOUD_NAME = 'dtmebo99b';

/* Author Information */
export const AUTHOR_NAME = 'Minh Dan';
export const AUTHOR_FULLNAME = 'Nguyen Minh Dan';
export const AUTHOR_EMAIL = 'nguyenmd.works@gmail.com';
export const AUTHOR_FACEBOOK = 'minhdan2912';
export const AUTHOR_INSTAGRAM = 'ng.minh.dan';
export const AUTHOR_LINKEDIN = 'nmdan';
export const AUTHOR_TWITTER = 'xxx';
