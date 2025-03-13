'use client'

import React from 'react'
import {
    QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getQueryClient } from './query-client';

export const Provider = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  // Create a client
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools></ReactQueryDevtools>
      {children}
    </QueryClientProvider>
  )
}