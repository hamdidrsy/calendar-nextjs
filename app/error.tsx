"use client"

import { useEffect } from 'react'
import { ErrorMessage } from '@/components/ui'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Sayfa hatasi:', error)
  }, [error])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <h1 style={{ marginBottom: '20px', color: '#333' }}>Bir Hata Olustu</h1>
      <ErrorMessage
        message="Sayfa yuklenirken bir hata olustu. Lutfen tekrar deneyin."
        onRetry={reset}
      />
    </div>
  )
}
