import type { ContentMeta } from '@/modules/Content/services/content-parser';

type SearchablePost = Pick<ContentMeta, 'title' | 'description'>;

/**
 * Whether a post matches a free-text query, on its title or description.
 * Shared by the blog list search and the command palette.
 * @param post - post meta with title and description
 * @param query - what the reader typed
 */
export function matchesPostQuery(post: SearchablePost, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return post.title.toLowerCase().includes(q) || post.description.toLowerCase().includes(q);
}
