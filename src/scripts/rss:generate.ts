/* eslint-disable no-console */
import generateRSSFeed from '@/modules/ContentParser/services/rss-feed';

async function main() {
  try {
    await generateRSSFeed();
    console.log('RSS feed generated successfully.');
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    process.exit(1);
  }
};

main();
