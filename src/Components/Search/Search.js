import { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import lunr from 'lunr';

import { IoMdClose } from 'react-icons/io';
import { fetchSearchIndex } from '@/DAL';

import styles from './Search.module.less';

const MIN_SYMBOLS = 3;

const Search = () => {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(null);
  const [store, setStore] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);
  const inputRef = useRef(null);

  const { data: indexData, isLoading, isError } = useQuery({
    queryKey: ['search-index'],
    queryFn: async () => {
      try {
        const response = await fetchSearchIndex();
        return response.data;
      } catch (error) {
        console.log('No search index');
        return null;
      }
    },
    enabled: query.length > 1,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (indexData) {
      setIndex(lunr.Index.load(indexData.index));
      setStore(indexData.store);
    }
  }, [indexData]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  }, []);

  let results = [];
  if (index && query.length >= MIN_SYMBOLS) {
    const terms = query.trim().split(/\s+/).filter(Boolean);
    const seen = new Map();

    const mergeResults = (hits) => {
      for (const hit of hits) {
        const prev = seen.get(hit.ref);
        if (prev) {
          prev.score = Math.max(prev.score, hit.score);
        } else {
          seen.set(hit.ref, { ...hit });
        }
      }
    };

    const trySearch = (q) => {
      try { return index.search(q); } catch { return []; }
    };

    mergeResults(trySearch(terms.join(' ')));
    mergeResults(trySearch(terms.map((t) => `${t}*`).join(' ')));
    // remove that due it's too sensetive, for example `memo` match with `mode`, `more` mergeResults(trySearch(terms.map((t) => `${t}~1`).join(' ')));

    results = Array.from(seen.values()).sort((a, b) => b.score - a.score);
  }

  const hasResults = results.length > 0;

  return (
    <div className={styles.root} ref={rootRef}>
      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search for articles..."
          name="search"
        />
        {query && (
          <button
            className={styles.clearButton}
            onClick={() => {
              setQuery('');
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
          >
            <IoMdClose />
          </button>
        )}
      </div>
      {isLoading && query.length >= MIN_SYMBOLS && <div className={styles.loading}>Loading...</div>}
      {isError && <div className={styles.error}>Error loading search index.</div>}
      {isOpen && query.length >= MIN_SYMBOLS && (
        <ul className={styles.results}>
          {hasResults ? (
            results.map((result) => {
              const meta = store?.[result.ref];
              const slug = meta?.slug || result.ref.replace(/^articles\//, '');
              const title = meta?.title || slug;
              const description = meta?.description || '';

              return (
                <li key={result.ref} className={styles.resultItem}>
                  <Link
                    to={`/articles/${slug}/`}
                    className={styles.resultLink}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className={styles.resultTitle}>{title}</span>
                    {description && (
                      <span className={styles.resultDescription}>{description}</span>
                    )}
                  </Link>
                </li>
              );
            })
          ) : (
            !isLoading && <li className={styles.noResults}>No articles found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
