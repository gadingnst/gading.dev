const withCacheControl = (params = []) => ([
  {
    key: 'Cache-Control',
    value: 'public, max-age=31536000, immutable'
  },
  ...params
]);

/** @see https://nextjs.org/docs/api-reference/next.config.js/headers */
function headers() {
  return [
    {
      source: '/assets/images/authors/(.*)',
      headers: withCacheControl()
    },
    {
      source: '/assets/media/banners/(.*)',
      headers: withCacheControl()
    },
    {
      // Enable CORS
      source: '/api/(.*)',
      headers: [
        { key: 'Access-Control-Allow-Credentials', value: 'true' },
        { key: 'Access-Control-Allow-Origin', value: '*' },
        { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
        { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' }
      ]
    },
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains; preload'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        }
      ]
    }
  ];
}

module.exports = headers;
