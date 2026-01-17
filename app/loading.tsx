import { LoadingSpinner } from '@/components/ui'

export default function Loading() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh'
    }}>
      <LoadingSpinner size="large" text="Sayfa yukleniyor..." />
    </div>
  )
}
