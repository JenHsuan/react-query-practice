'use client'

import { fetchArticleById } from '@/api/article';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import * as _ from 'lodash';

import styles from './page.module.scss';

const page = ({
  params,
}: {
  params: Promise<{ id: Number }>
}) => {
  const [id, setId] = useState<Number | null>(null);

  useEffect(() => {
    const updateId = async () => {
      try {
        const { id } = await params;
        setId(id);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    updateId();
  }, []);

  // useQuery dependent Query & Lazy Queries
  const { isInitialLoading, isLoading, isError, data, error } = useQuery({ 
    queryKey: ['article', id], 
    queryFn: async () => fetchArticleById(id),

    // The query will not execute until the id exists
    enabled: !!id,

    // Will retry failed requests 10 times before displaying an error
    retry: 3,

    //The default retryDelay is set to double (starting at 1000ms) with each attempt, but not exceed 30 seconds:
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })

  const formatDate = (date: string) => (new Date(date)).toLocaleDateString();

  return (
    <>
    {/* If you are using disabled or lazy queries, 
    you can use the isInitialLoading flag instead. 
    It's a derived flag that is computed from: isLoading && isFetching so it will only be true if the query is currently fetching for the first time. */}

    {isInitialLoading && (
      <div className={ styles.loadingContainer }>wait...</div>
    )}

    {isError && (
      <div>{error as any} </div>
    )}

    {data && (
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
    )}
   </>
  )
}

export default page