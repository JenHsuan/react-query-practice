'use client'

import { fetchArticles } from '@/api/article'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import React, { useEffect } from 'react'

import styles from './page.module.scss';
import { getArticlesData } from '@/utils/staticData'
import { Article } from '@/api/model/articles'

const page = () => {
  // staleTime: Affects refetching while the query is active.	
  // cacheTime: Affects garbage collection when the query is inactive.
  const { isLoading, isError, data, error } = useQuery({ 
    queryKey: ['articles'], 
    queryFn: fetchArticles,
    staleTime: 0, // Data is fresh for 0 minutes
    cacheTime: 10 * 60 * 1000, // Data stays in cache for 10 minutes after inactivity
  })

  return (
    <>
    {isLoading && (
      <div className={ styles.loadingContainer }>wait...</div>
    )}

    {isError && (
      <div>{error as any} </div>
    )}
    {data && (
      <>
        <ul>{
          data?.map((article: Article) => (
            <li key = {`${article.id}`}>
              <Link href={`/article/${article.id}`}>{article.title}</Link>
            </li>
          ))}
        </ul>
      </>
    )}
   </>)
}

// export async function getStaticProps(){
//   return await getArticlesData();
// }

export default page