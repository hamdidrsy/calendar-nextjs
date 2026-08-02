const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/
const COLOR_PATTERN = /^#[0-9a-fA-F]{6}$/

export type EventInput = {
  title: string
  description: string | null
  date: string
  startTime: string
  endTime: string
  color: string
}

export class RequestValidationError extends Error {
  constructor(public readonly details: string[]) {
    super('Gönderilen bilgiler geçersiz.')
    this.name = 'RequestValidationError'
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function isDateOnly(value: string): boolean {
  if (!DATE_PATTERN.test(value)) return false

  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))

  return date.getUTCFullYear() === year
    && date.getUTCMonth() === month - 1
    && date.getUTCDate() === day
}

export function dateOnlyToUtc(value: string): Date {
  if (!isDateOnly(value)) {
    throw new RequestValidationError(['Tarih YYYY-MM-DD biçiminde olmalıdır.'])
  }

  return new Date(`${value}T00:00:00.000Z`)
}

export function utcDateToDateOnly(value: Date | string): string {
  return new Date(value).toISOString().slice(0, 10)
}

export function validateEventInput(value: unknown): EventInput {
  if (!isRecord(value)) {
    throw new RequestValidationError(['İstek gövdesi bir JSON nesnesi olmalıdır.'])
  }

  const errors: string[] = []
  const title = typeof value.title === 'string' ? value.title.trim() : ''
  const description = typeof value.description === 'string' ? value.description.trim() : null
  const date = typeof value.date === 'string' ? value.date : ''
  const startTime = typeof value.startTime === 'string' ? value.startTime : ''
  const endTime = typeof value.endTime === 'string' ? value.endTime : ''
  const color = typeof value.color === 'string' ? value.color : '#3788d8'

  if (!title) errors.push('Başlık zorunludur.')
  if (title.length > 120) errors.push('Başlık en fazla 120 karakter olabilir.')
  if (description && description.length > 2000) {
    errors.push('Açıklama en fazla 2000 karakter olabilir.')
  }
  if (!isDateOnly(date)) errors.push('Tarih YYYY-MM-DD biçiminde ve geçerli olmalıdır.')
  if (!TIME_PATTERN.test(startTime)) errors.push('Başlangıç saati HH:mm biçiminde olmalıdır.')
  if (!TIME_PATTERN.test(endTime)) errors.push('Bitiş saati HH:mm biçiminde olmalıdır.')
  if (TIME_PATTERN.test(startTime) && TIME_PATTERN.test(endTime) && endTime <= startTime) {
    errors.push('Bitiş saati başlangıç saatinden sonra olmalıdır.')
  }
  if (!COLOR_PATTERN.test(color)) errors.push('Renk #RRGGBB biçiminde olmalıdır.')

  if (errors.length > 0) throw new RequestValidationError(errors)

  return {
    title,
    description: description || null,
    date,
    startTime,
    endTime,
    color: color.toLowerCase(),
  }
}

export function validateDateRange(startDate: string | null, endDate: string | null) {
  if (!startDate && !endDate) return null

  const errors: string[] = []
  if (!startDate || !isDateOnly(startDate)) {
    errors.push('startDate YYYY-MM-DD biçiminde olmalıdır.')
  }
  if (!endDate || !isDateOnly(endDate)) {
    errors.push('endDate YYYY-MM-DD biçiminde olmalıdır.')
  }
  if (errors.length === 0 && startDate! > endDate!) {
    errors.push('startDate, endDate değerinden sonra olamaz.')
  }
  if (errors.length > 0) throw new RequestValidationError(errors)

  return {
    gte: dateOnlyToUtc(startDate!),
    lte: dateOnlyToUtc(endDate!),
  }
}
