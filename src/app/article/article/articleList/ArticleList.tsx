import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { articlesKeys } from '@/api/query-key/query-key';
import { fetchArticles } from '@/api/article';
import { Article } from '@/api/model/articles';
import Link from 'next/link';

const ArticleList = () => {
  // staleTime: Affects refetching while the query is active.	
  // cacheTime: Affects garbage collection when the query is inactive.
  const { data } = useQuery({ 
    queryKey: articlesKeys.all, 
    queryFn: fetchArticles,
    staleTime: 0, // Data is fresh for 0 minutes
    cacheTime: 10 * 60 * 1000, // Data stays in cache for 10 minutes after inactivity
  })

  return (
    <div>
      {data && (
        <ul>
          {data?.map((article: Article) => (
            <li key = {`${article.id}`}>
              <Link href={`/article/${article.id}`}>{article.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ArticleList