import React from 'react'

import Image from 'next/image'

import { useQuery } from '@tanstack/react-query';
import { articlesKeys } from '@/app/api/query-key/query-key';
import { fetchArticleById } from '@/app/api/article/article';

import styles from './ArticleDetail.module.scss';

const ArticleDetail = ({ id }: { id: Number}) => {
  // useQuery dependent Query & Lazy Queries
  const { isInitialLoading, isLoading, isError, data, error } = useQuery({ 
    queryKey: articlesKeys.detail(id), 
    queryFn: async () => await  fetchArticleById(id),

    // The query will not execute until the id exists
    enabled: !!id,

    // Will retry failed requests 10 times before displaying an error
    retry: 3,

    //The default retryDelay is set to double (starting at 1000ms) with each attempt, but not exceed 30 seconds:
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
  
  const formatDate = (date: string) => (new Date(date)).toLocaleDateString();

  return (
    <div className={ styles.container }>
        <h1 className={ styles.title }>{ data![0].title }</h1>
        <div className={ styles.introduction }>{ data![0].subtitle }</div>
        <div className={ styles.imageContainer}>
          <Image
            src={ data![0].image }
            width={900}
            height={500}
            alt={ data![0].title }
          />
        </div>
        <div className={ styles.time }>
          <span>{ formatDate(data![0].time) }</span>
          <span className={ styles.concator}>by</span>
          <span>{ data![0].name }</span>
        </div>
      </div>
  )
}

export default ArticleDetail