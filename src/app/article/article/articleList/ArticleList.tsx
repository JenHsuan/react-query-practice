import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { articlesKeys } from '@/app/api/query-key/query-key';
import { fetchArticles } from '@/app/api/article/article';
import { Article } from '@/app/api/model/articles';
import Link from 'next/link';
import { getQueryClient } from '@/app/api/query-client/query-client';

import styles from './ArticleList.module.scss';

const PAGE_SIZE = 10;

const ArticleList = () => {
  const [page, setPage] = React.useState(1);

  const queryClient = getQueryClient();

  // staleTime: Affects refetching while the query is active.	
  // cacheTime: Affects garbage collection when the query is inactive.
  const { data, isPreviousData } = useQuery({ 
    queryKey: articlesKeys.page(page), 
    queryFn: async () => await fetchArticles(PAGE_SIZE, page),
    keepPreviousData: true,
    staleTime: 0, // Data is fresh for 0 minutes
    cacheTime: 10 * 60 * 1000, // Data stays in cache for 10 minutes after inactivity
  })

  useEffect(() => {
    if (!isPreviousData && data.length === PAGE_SIZE) {
      queryClient.prefetchQuery({
        queryKey: articlesKeys.page(page + 1), 
        queryFn: async () => await fetchArticles(PAGE_SIZE, page + 1),
      })
    }
  }, [data, isPreviousData, page, queryClient]);

  return (
    <div className={styles.container}>
      {data && (
        <>

<ul>
          {data?.map((article: Article) => (
            <li key = {`${article.id}`}>
              <Link href={`/article/${article.id}`}>{article.title}</Link>
            </li>
          ))}
        </ul>
      <div className={styles.buttonGroupContainer}>
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 0}>
          Previous Page
        </button>
        <div>Current Page: {page}</div>
        <button 
          onClick={() => setPage((old) => (data.length === PAGE_SIZE ? old + 1 : old))} 
          disabled={isPreviousData || data.length < PAGE_SIZE}>
          Next Page
          </button>
      </div>
        </>
      )}
    </div>
  )
}

export default ArticleList