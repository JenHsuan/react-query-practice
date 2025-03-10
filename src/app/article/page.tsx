'use client'

import { fetchArticles } from '@/api/article'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import React, { useEffect } from 'react'

const page = () => {
  // Queries
  const { isLoading, isError, data, error } = useQuery({ queryKey: ['articles'], queryFn: fetchArticles })

  return (
    <>
    {isLoading && (
      <div>wait</div>
    )}
    {isError && (
      <div>{error as any} </div>
    )}
    {data && (
      <>
        <ul>{
          data?.map((article) => (
            <li key = {`${article.id}`}>
              <Link href={`/article/${article.id}`}>{article.title}</Link>
            </li>
          ))}
        </ul>
      </>
    )}
   </>)
}

export default page