'use client';

import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';
import { useCallback, useMemo } from 'react';

import cn from '@/designs/utils/cn';
import NextLink from '@/packages/components/base/Navigations/NextLink';
import range from '@/packages/utils/helpers/range';

export interface Props {
  value: number;
  total?: number;
  perPage?: number;
  pageCount?: number;
  className?: string;
  hrefPrefix?: string;
  defaultPagesToDisplay?: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange?: (page: number) => void;
}

function Pagination(props: Props) {
  const {
    value,
    className,
    hrefPrefix,
    total = 0,
    perPage = 10,
    pageCount = 0,
    defaultPagesToDisplay = 5,
    onPageChange = () => void 0
  } = props;

  const totalPages = useMemo(() => {
    if (pageCount > 0) return pageCount;
    if (total > 0) {
      return Math.ceil(total / perPage);
    }
    return 1;
  }, [pageCount, total, perPage]);

  const pagesToDisplay = useMemo(() => {
    if (totalPages > 0 && totalPages < defaultPagesToDisplay) {
      return totalPages;
    }
    return defaultPagesToDisplay;
  }, [totalPages, defaultPagesToDisplay]);

  const minPages = useMemo(() => {
    if (value >= pagesToDisplay) {
      const pagesToAdd = Math.floor(pagesToDisplay / 2);
      const newMaxPage = pagesToAdd + value;
      if (newMaxPage > totalPages) {
        return totalPages - pagesToDisplay + 1;
      }
      return value - pagesToAdd;
    }
    return 1;
  }, [value, pagesToDisplay, totalPages]);

  const maxPages = useMemo(() => {
    if (value >= pagesToDisplay) {
      const pagesToAdd = Math.floor(pagesToDisplay / 2);
      const newMaxPage = pagesToAdd + value;
      if (newMaxPage < totalPages) {
        return newMaxPage;
      }
      return totalPages;
    }
    return pagesToDisplay;
  }, [value, pagesToDisplay, totalPages]);

  const pages = useMemo(() => range(minPages, maxPages), [minPages, maxPages]);

  const handlePageChange = useCallback((page: number) => () => {
    if (value !== page) onPageChange(page);
  }, [onPageChange, value]);

  const nextPage = useCallback(() => {
    if (value < totalPages) {
      onPageChange(value + 1);
    }
  }, [value, totalPages, onPageChange]);

  const prevPage = useCallback(() => {
    if (value > 1) {
      onPageChange(value - 1);
    }
  }, [onPageChange, value]);

  const handleHref = useCallback((page: number) => {
    return !hrefPrefix || page > totalPages || page < 1 ? '' : hrefPrefix + page;
  }, [hrefPrefix, totalPages]);

  return (
    <ul
      className={cn([
        'flex items-center justify-center select-none',
        className
      ])}
    >
      <li onClick={prevPage}>
        <NextLink withCurrentLocale aria-label={`Prev to page ${value - 1}`} href={handleHref(value - 1)}>
          <span
            className={cn(
              'w-9 h-9 flex items-center justify-center text-base p-0 my-0 mx-1 rounded-full cursor-pointer',
              {
                'pointer-events-none opacity-50': value === 1,
                'hover:outline outline-primary dark:outline-accent': value !== 1
              }
            )}
          >
            <ArrowLeftCircle width={16} height={16} />
          </span>
        </NextLink>
      </li>
      {pages.map((page) => (
        <li key={page} onClick={handlePageChange(page)}>
          <NextLink withCurrentLocale aria-label={`Go to page ${page}`} href={handleHref(page)}>
            <span
              className={cn(
                'w-9 h-9 flex items-center justify-center text-base p-0 my-0 mx-1 rounded-full cursor-pointer',
                {
                  'shadow-lg bg-primary text-white pointer-events-none': value === page,
                  'hover:outline outline-primary dark:outline-accent': value !== page
                }
              )}
            >
              {page}
            </span>
          </NextLink>
        </li>
      ))}
      <li onClick={nextPage}>
        <NextLink withCurrentLocale aria-label={`Next to page ${value + 1}`} href={handleHref(value + 1)}>
          <span
            className={cn(
              'w-9 h-9 flex items-center justify-center text-base p-0 my-0 mx-1 rounded-full cursor-pointer',
              {
                'pointer-events-none opacity-50': value === totalPages,
                'hover:outline outline-primary dark:outline-accent': value !== totalPages
              }
            )}
          >
            <ArrowRightCircle width={16} height={16} />
          </span>
        </NextLink>
      </li>
    </ul>
  );
};

export default Pagination;
