'use client'

import React, { useEffect } from 'react'
import { useAngularSite } from '../api/graphql/useAngularSite'

const page = () => {
  const { status, data, error, isFetching } =  useAngularSite();

  useEffect(() => {
    console.log(data)
  }, [data]);
  
  return (
    <div>page</div>
  )
}

export default page