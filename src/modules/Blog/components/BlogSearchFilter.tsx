'use client';
/* eslint-disable react-hooks/set-state-in-effect */

import { ArrowLeftIcon, ArrowRightIcon, ChevronLeft, ChevronRight, Search, Star, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

import cn from '@/designs/utils/cn';
import BlogCardList from '@/modules/Blog/components/CardList';
import { matchesPostQuery } from '@/modules/Blog/utils/search';
import type { ContentMeta } from '@/modules/Content/services/content-parser';
import Banner from '@/packages/components/layouts/Header/Banner';
import range from '@/packages/utils/helpers/range';

interface Props {
  blogs: ContentMeta[];
  initialPage?: number;
  lang: string;
  localeDesc: {
    desc: string;
    searchPlaceholder: string;
    allTags: string;
    emptyState: string;
    clearSearch: string;
  };
}

const ITEMS_PER_PAGE = 10;

function BlogSearchFilter({ blogs, initialPage = 1, localeDesc }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isMounted, setIsMounted] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Sync state from URL query parameters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('q') || '';
      const tag = params.get('tag') || '';

      if (q) setSearchQuery(q);
      if (tag) setSelectedTag(tag);
      setIsMounted(true);
    }
  }, []);

  // Update URL query parameters on state changes
  const updateUrl = (q: string, tag: string | null) => {
    if (typeof window !== 'undefined' && isMounted) {
      const params = new URLSearchParams();
      if (q) params.set('q', q);
      if (tag) params.set('tag', tag);

      const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
      window.history.replaceState(null, '', newUrl);
    }
  };

  // Get all unique tags from all blogs
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    blogs.forEach((blog) => {
      if (blog.tags) {
        blog.tags.forEach((tag) => {
          if (tag.toLowerCase() !== 'featured') {
            tagsSet.add(tag);
          }
        });
      }
    });
    return Array.from(tagsSet).sort();
  }, [blogs]);

  // Handle filtering logic
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch = matchesPostQuery(blog, searchQuery);

      const matchesTag =
        !selectedTag ||
        (selectedTag === 'featured'
          ? !!blog.isFeatured
          : blog.tags && blog.tags.includes(selectedTag));

      return matchesSearch && matchesTag;
    });
  }, [blogs, searchQuery, selectedTag]);

  // Reset pagination when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTag]);

  // Compute pagination bounds
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE) || 1;
  const pagedBlogs = useMemo(() => {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBlogs.slice(offset, offset + ITEMS_PER_PAGE);
  }, [filteredBlogs, currentPage]);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    updateUrl(val, selectedTag);
  };

  const handleTagClick = (tag: string | null) => {
    setSelectedTag(tag);
    updateUrl(searchQuery, tag);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    updateUrl('', selectedTag);
  };

  const handleResetAll = () => {
    setSearchQuery('');
    setSelectedTag(null);
    updateUrl('', null);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 300, behavior: 'smooth' });
      }
    }
  };

  // Handle tags scroll navigation
  const handleScroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollOffset,
        behavior: 'smooth'
      });
    }
  };

  // Custom Pagination implementation for client states
  const renderPagination = () => {
    const pagesToDisplay = 5;
    let minPages = 1;
    let maxPages = totalPages;

    if (totalPages > pagesToDisplay) {
      if (currentPage >= pagesToDisplay) {
        const pagesToAdd = Math.floor(pagesToDisplay / 2);
        const newMaxPage = pagesToAdd + currentPage;
        if (newMaxPage > totalPages) {
          minPages = totalPages - pagesToDisplay + 1;
          maxPages = totalPages;
        } else {
          minPages = currentPage - pagesToAdd;
          maxPages = newMaxPage;
        }
      } else {
        minPages = 1;
        maxPages = pagesToDisplay;
      }
    }

    const pages = range(minPages, maxPages);

    return (
      <ul className="flex items-center justify-center select-none mt-4">
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Prev page"
            className={cn([
              'w-9 h-9 flex items-center justify-center text-base rounded-full transition-all duration-300 border border-transparent',
              currentPage === 1
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:outline outline-primary dark:outline-accent cursor-pointer'
            ])}
          >
            <ArrowLeftIcon width={16} height={16} />
          </button>
        </li>
        {pages.map((page) => (
          <li key={page}>
            <button
              onClick={() => handlePageChange(page)}
              aria-label={`Go to page ${page}`}
              className={cn([
                'w-9 h-9 flex items-center justify-center text-base rounded-full transition-all duration-300 mx-1 border border-transparent font-medium',
                currentPage === page
                  ? 'shadow-lg bg-primary text-primary-content pointer-events-none scale-105'
                  : 'hover:outline outline-primary dark:outline-accent cursor-pointer text-base-content/85'
              ])}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className={cn([
              'w-9 h-9 flex items-center justify-center text-base rounded-full transition-all duration-300 border border-transparent',
              currentPage === totalPages
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:outline outline-primary dark:outline-accent cursor-pointer'
            ])}
          >
            <ArrowRightIcon width={16} height={16} />
          </button>
        </li>
      </ul>
    );
  };

  return (
    <div className="w-full flex flex-col">
      {/* CSS inject for hiding scrollbar */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Banner with Embedded Search and Tags */}
      <Banner bgImage="/media/default-banners/5.jpg">
        <section className="font-serif flex flex-col h-full items-center justify-center text-center">
          <div className="base-container relative z-10 w-full max-w-3xl">
            <div className="liquid-glass-shadow rounded-2xl p-6 md:p-8 flex flex-col items-center gap-4">
              <h1 className="text-2xl md:text-4xl font-bold">
                Blog
              </h1>
              <p className="text-base text-muted max-w-xl">
                {localeDesc.desc}
              </p>

              {/* Premium Glassmorphic Search Bar inside the main banner card */}
              <div className="w-full max-w-xl mt-4">
                <div className="rounded-full p-0.5 bg-card border border-line flex items-center shadow-soft transition-all duration-300 focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/15">
                  <Search className="w-5 h-5 text-muted ml-4 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder={localeDesc.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="input input-ghost w-full focus:outline-none focus:bg-transparent text-base-content placeholder:text-muted text-base border-none bg-transparent h-11 px-3 focus:ring-0 focus:border-none outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={handleClearSearch}
                      className="btn btn-ghost btn-circle btn-sm mr-2 text-muted hover:text-base-content flex-shrink-0"
                      aria-label="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Horizontal Scrollable Tag Pills inside the main banner card with Arrow Navigation */}
              <div className="relative w-full max-w-2xl mt-2 flex items-center px-9">
                {/* Left Navigation Arrow */}
                <button
                  type="button"
                  onClick={() => handleScroll(-180)}
                  className="absolute left-0 z-10 p-1.5 rounded-full bg-card hover:bg-brand-soft border border-line text-base-content cursor-pointer transition-all duration-300 shadow-soft flex items-center justify-center hover:scale-105"
                  aria-label="Scroll tags left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Scrollable Tags Container (Always starts at scrollLeft = 0) */}
                <div
                  ref={scrollContainerRef}
                  className="w-full flex flex-nowrap overflow-x-auto gap-2 py-1 no-scrollbar scroll-smooth justify-start"
                >
                  <button
                    onClick={() => handleTagClick(null)}
                    className={cn([
                      'px-4 py-1.5 font-mono text-xs md:text-sm rounded-full transition-all duration-300 border flex-shrink-0 font-medium',
                      !selectedTag
                        ? 'bg-brand-soft text-brand border-brand/30 shadow-sm'
                        : 'bg-card text-muted border-line hover:text-base-content cursor-pointer'
                    ])}
                  >
                    {localeDesc.allTags}
                  </button>
                  <button
                    onClick={() => handleTagClick('featured')}
                    className={cn([
                      'px-4 py-1.5 font-mono text-xs md:text-sm rounded-full transition-all duration-300 border flex-shrink-0 font-medium flex items-center gap-1',
                      selectedTag === 'featured'
                        ? 'bg-brand-soft text-brand border-brand/40 shadow-sm font-bold'
                        : 'bg-card text-muted border-line hover:text-base-content cursor-pointer'
                    ])}
                  >
                    <Star className="w-3 h-3 fill-current" />
                    Featured
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className={cn([
                        'px-4 py-1.5 font-mono text-xs md:text-sm rounded-full transition-all duration-300 border flex-shrink-0 font-medium',
                        selectedTag === tag
                          ? 'bg-brand-soft text-brand border-brand/30 shadow-sm'
                          : 'bg-card text-muted border-line hover:text-base-content cursor-pointer'
                      ])}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>

                {/* Right Navigation Arrow */}
                <button
                  type="button"
                  onClick={() => handleScroll(180)}
                  className="absolute right-0 z-10 p-1.5 rounded-full bg-card hover:bg-brand-soft border border-line text-base-content cursor-pointer transition-all duration-300 shadow-soft flex items-center justify-center hover:scale-105"
                  aria-label="Scroll tags right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </Banner>

      {/* Blog Cards Grid */}
      {filteredBlogs.length > 0 ? (
        <div className="flex flex-col flex-1">
          <BlogCardList className="-mt-14 z-20" contents={pagedBlogs} />
          {totalPages > 1 && (
            <div className="mt-8 mb-12 text-center">
              <h4 className="mb-3 text-sm text-base-content/50">
                Page {currentPage} of {totalPages}
              </h4>
              {renderPagination()}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 px-4 z-10 flex-1">
          <div className="max-w-md mx-auto p-8 rounded-3xl bg-card border border-line shadow-soft">
            <p className="text-base-content/80 text-base font-medium">
              {localeDesc.emptyState}
            </p>
            <button
              onClick={handleResetAll}
              className="btn btn-outline btn-primary mt-5 btn-sm rounded-full px-5 cursor-pointer font-semibold"
            >
              {localeDesc.clearSearch}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogSearchFilter;
