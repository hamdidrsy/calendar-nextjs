import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: '72px',
        fontWeight: 'bold',
        color: '#e0e0e0',
        margin: '0'
      }}>
        404
      </h1>
      <h2 style={{
        fontSize: '24px',
        color: '#333',
        marginBottom: '16px'
      }}>
        Sayfa Bulunamadi
      </h2>
      <p style={{
        color: '#666',
        marginBottom: '24px'
      }}>
        Aradiginiz sayfa mevcut degil veya tasindi.
      </p>
      <Link
        href="/"
        style={{
          backgroundColor: '#4a90d9',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '500',
          transition: 'background-color 0.2s'
        }}
      >
        Ana Sayfaya Don
      </Link>
    </div>
  )
}
