import { describe, expect, it } from 'vitest'
import {
  dateOnlyToUtc,
  isDateOnly,
  RequestValidationError,
  utcDateToDateOnly,
  validateDateRange,
  validateEventInput,
} from '@/lib/eventValidation'

const validEvent = {
  title: '  İlk görüşme  ',
  description: '  Tanışma seansı  ',
  date: '2026-08-10',
  startTime: '09:00',
  endTime: '10:00',
  color: '#3788D8',
}

describe('event validation', () => {
  it('normalizes a valid event input', () => {
    expect(validateEventInput(validEvent)).toEqual({
      ...validEvent,
      title: 'İlk görüşme',
      description: 'Tanışma seansı',
      color: '#3788d8',
    })
  })

  it('rejects an invalid calendar date', () => {
    expect(isDateOnly('2026-02-29')).toBe(false)
    expect(() => validateEventInput({ ...validEvent, date: '2026-02-29' }))
      .toThrow(RequestValidationError)
  })

  it('requires the end time to be after the start time', () => {
    expect(() => validateEventInput({
      ...validEvent,
      startTime: '10:00',
      endTime: '09:00',
    })).toThrow('Gönderilen bilgiler geçersiz.')
  })

  it('rejects malformed colors and oversized titles', () => {
    expect(() => validateEventInput({
      ...validEvent,
      title: 'a'.repeat(121),
      color: 'blue',
    })).toThrow(RequestValidationError)
  })
})

describe('date standard', () => {
  it('stores date-only values at UTC midnight', () => {
    const date = dateOnlyToUtc('2026-08-10')
    expect(date.toISOString()).toBe('2026-08-10T00:00:00.000Z')
    expect(utcDateToDateOnly(date)).toBe('2026-08-10')
  })

  it('validates complete and ordered date ranges', () => {
    expect(validateDateRange(null, null)).toBeNull()
    expect(validateDateRange('2026-08-01', '2026-08-31')).toEqual({
      gte: new Date('2026-08-01T00:00:00.000Z'),
      lte: new Date('2026-08-31T00:00:00.000Z'),
    })
    expect(() => validateDateRange('2026-08-31', '2026-08-01'))
      .toThrow(RequestValidationError)
    expect(() => validateDateRange('2026-08-01', null))
      .toThrow(RequestValidationError)
  })
})
