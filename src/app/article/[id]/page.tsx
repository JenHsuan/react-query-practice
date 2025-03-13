'use client'

import { QueryErrorResetBoundary, useQuery } from '@tanstack/react-query';
import React, { lazy, Suspense, useEffect, useState } from 'react'

import * as _ from 'lodash';

import Loading from '@/app/common/loading/Loading';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorContainer from '@/app/common/error/ErrorContainer';

const ArticleDetail = lazy(() => import('../article/articleDetail/ArticleDetail'));

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

  return (
    <>
      <QueryErrorResetBoundary>
      {({ reset }) => (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary
        onReset={reset}
        fallbackRender={({ error, resetErrorBoundary }) => {
          return <ErrorContainer error={error} resetErrorBoundary={ resetErrorBoundary }/>
        }}>
        <ArticleDetail id={ id }/>
      </ErrorBoundary>
      </Suspense>)}
    </QueryErrorResetBoundary>
    </>
  )
}

export default page