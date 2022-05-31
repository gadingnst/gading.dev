import { FunctionComponent, useCallback, useMemo } from 'react';
import clsxm from '@/utils/helpers/clsxm';
import range from '@/utils/helpers/range';
import styles from './index.module.css';

export interface Props {
  value: number;
  total?: number;
  perPage?: number;
  pageCount?: number;
  className?: string;
  defaultPagesToDisplay?: number;
  onPageChange: (page: number) => void;
}

const Pagination: FunctionComponent<Props> = (props) => {
  const {
    value,
    className,
    onPageChange,
    total = 0,
    perPage = 10,
    pageCount = 0,
    defaultPagesToDisplay = 5
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
  }, [value]);

  const nextPage = useCallback(() => {
    if (value < totalPages) {
      onPageChange(value + 1);
    }
  }, [value, totalPages]);

  const prevPage = useCallback(() => {
    if (value > 1) {
      onPageChange(value - 1);
    }
  }, [value]);

  return (
    <ul className={clsxm(styles.pagination, className)}>
      <li
        onClick={prevPage}
        className={clsxm(
          styles['page-item'],
          value === 1 ? styles.disabled : ''
        )}
      >
        <a className={styles['page-link']}>
          <span>Prev</span>
        </a>
      </li>
      {pages.map((page) => (
        <li
          key={page}
          onClick={handlePageChange(page)}
          className={clsxm(styles['page-item'], value === page ? styles.active : '')}
        >
          <a className={styles['page-link']}>
            {page}
          </a>
        </li>
      ))}
      <li
        onClick={nextPage}
        className={clsxm(
          styles['page-item'],
          value === totalPages ? styles.disabled : ''
        )}
      >
        <a className={styles['page-link']}>
          <span>Next</span>
        </a>
      </li>
    </ul>
  );
};

Pagination.defaultProps = {
  defaultPagesToDisplay: 5,
  total: 0,
  pageCount: 0,
  perPage: 10,
  className: ''
};

export default Pagination;
