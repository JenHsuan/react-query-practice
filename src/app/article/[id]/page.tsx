'use client'

import { fetchArticleById } from '@/api/article';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const page = ({
  params,
}: {
  params: Promise<{ id: Number }>
}) => {
    const [id, setId] = useState<Number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const { id } = await params;
            setId(id);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

  // Queries
  const { isLoading, isError, data, error } = useQuery({ queryKey: ['article', id], queryFn: () => fetchArticleById(id) })

  return (
    <>
    {isLoading && (
      <div>wait</div>
    )}
    {isError && (
      <div>{error as any} </div>
    )}
    {data && (
      <div>
        <h1>{ data![0].title }</h1>
        <div>{ data![0].subtitle }</div>
        <Image
          src={ data![0].image }
          width={900}
          height={500}
          alt={ data![0].title }
        />
      </div>
    )}
   </>
  )
}

export default page