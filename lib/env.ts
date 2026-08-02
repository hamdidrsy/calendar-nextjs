type ServerEnv = {
  databaseUrl: string
}

const POSTGRES_PROTOCOLS = new Set(['postgres:', 'postgresql:'])

export function getServerEnv(): ServerEnv {
  const databaseUrl = process.env.DATABASE_URL?.trim()

  if (!databaseUrl) {
    throw new Error(
      'DATABASE_URL tanımlı değil. .env.example dosyasını .env olarak kopyalayıp PostgreSQL bağlantısını girin.'
    )
  }

  let parsedUrl: URL
  try {
    parsedUrl = new URL(databaseUrl)
  } catch {
    throw new Error('DATABASE_URL geçerli bir bağlantı adresi değil.')
  }

  if (!POSTGRES_PROTOCOLS.has(parsedUrl.protocol)) {
    throw new Error('DATABASE_URL postgres:// veya postgresql:// ile başlamalıdır.')
  }

  return { databaseUrl }
}
