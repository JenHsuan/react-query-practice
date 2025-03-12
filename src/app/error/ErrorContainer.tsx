import React from 'react'

import styles from './Error.module.scss';

const ErrorContainer = ({ error, resetErrorBoundary }: { error: any, resetErrorBoundary: any }) => {
  return (
    <>
      <div className={ styles.errorContainer }>{ error.message}</div>
      <button onClick={() => resetErrorBoundary()}></button>
    </>
  )
}

export default ErrorContainer