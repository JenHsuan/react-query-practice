'use client'

import React from 'react'
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


// Create a client
const queryClient = new QueryClient();

export const Provider = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools></ReactQueryDevtools>
      {children}
    </QueryClientProvider>
  )
}