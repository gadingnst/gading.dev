import type { SearchIndex } from '@/app/search-index.json/route';

/** index is fetched once per page load and shared by everything that needs it */
let searchIndexPromise: Promise<SearchIndex> | null = null;

/**
 * Post titles and slugs of both languages, from the static /search-index.json.
 * A failed fetch is forgotten, so the next call tries again.
 */
export function loadSearchIndex() {
  if (!searchIndexPromise) {
    searchIndexPromise = fetch('/search-index.json')
      .then((res) => {
        if (!res.ok) throw new Error(`search index: ${res.status}`);
        return res.json() as Promise<SearchIndex>;
      })
      .catch((err) => {
        searchIndexPromise = null;
        throw err;
      });
  }
  return searchIndexPromise;
}
