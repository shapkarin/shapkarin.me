import { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import lunr from 'lunr';
import React from 'react';

import { fetchSearchIndex } from '@/API';

import styles from './Search.module.less';

const Search = () => {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(null);

  const { data: indexJson, isLoading, isError } = useQuery(
    'search-index',
    async () => {
      try {
        const response = await fetchSearchIndex();
        return response.data;
      } catch (error) {
        // If endpoint doesn't exist (404) or any other error, return null
        console.log(`No search index`);
        return null;
      }
    },
    {
      enabled: query.length > 1,
      keepPreviousData: process.env.NODE_ENV === 'production' ? true : false, //fasle,
    }
  );

  useEffect(() => {
    if(indexJson){
      setIndex(
        lunr.Index.load(
          indexJson
        )
      )
    }
  }, [indexJson])


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