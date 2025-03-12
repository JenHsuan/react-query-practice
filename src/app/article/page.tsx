'use client'

import { QueryErrorResetBoundary, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { lazy, Suspense, useEffect } from 'react'

import Loading from '../loading/Loading'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorContainer from '../error/ErrorContainer'

const ArticleList = lazy(() => import('./article/articleList/ArticleList'))

const page = () => {
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
        <ArticleList/>
      </ErrorBoundary>
      </Suspense>)}
    </QueryErrorResetBoundary>
   </>)
}

export default page