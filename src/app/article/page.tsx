'use client'

import { fetchArticles } from '@/api/article'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'

const page = () => {

  // Access the client
  //const queryClient = useQueryClient()

  // Queries
  const query = useQuery({ queryKey: ['todos'], queryFn: fetchArticles })
  
  return (
    <>
      {!query.data && (
        <div>wait</div>
      )}
      {query.data && (
        <>
        <ul>{query.data?.map((article) => <li key = {`${article.id}`}>{article.title}</li>)}</ul>
        <div>page</div>
        </>
      )}
    </>
  )
}

export default page