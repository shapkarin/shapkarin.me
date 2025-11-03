import { useState } from 'react';
import { useQuery } from 'react-query';
import lunr from 'lunr';
import React from 'react';

import { fetchSearchIndex } from '@/API';

import styles from './Search.module.less';

const Search = () => {
  const [query, setQuery] = useState('');

  const { data: indexJson, isLoading, isError } = useQuery(
    'search-index',
    async () => {
      try {
        const response = await fetchSearchIndex();
        return response.data;
      } catch (error) {
        console.log(`No search index file`, error);
        return null;
      }
    },
    {
      keepPreviousData: process.env.NODE_ENV === 'production' ? true : false, //fasle,
    }
  );

  // lunr index is rebuilt every render
  const index = indexJson ? lunr.Index.load(indexJson) : null;

  // search results for the current query/index
  const results = (index && query.length >= 2) ? index.search(query) : [];

  return (
    <div className={styles.root}>
      <input
        className={styles.input}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {isLoading && <div className={styles.loading}>Loading...</div>}
      {isError && <div className={styles.error}>Error loading search index.</div>}
      <ul className={styles.results}>
        {results.map((result) => (
          <li key={result.ref} className={styles.resultItem}>
            <a href={`/${result.ref}`} className={styles.resultLink}>{result.ref}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;