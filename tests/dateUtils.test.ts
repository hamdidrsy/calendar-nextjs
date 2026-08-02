import { describe, expect, it } from 'vitest'
import { combineDateTime, getCalendarDays, isSameDay } from '@/utils/dateUtils'

describe('calendar date utilities', () => {
  it('always creates a six-week calendar grid', () => {
    const days = getCalendarDays(new Date(2026, 7, 1))
    expect(days).toHaveLength(42)
    expect(days.filter(day => day.isCurrentMonth)).toHaveLength(31)
  })

  it('compares calendar days without comparing object identity', () => {
    expect(isSameDay(
      new Date(2026, 7, 10, 9, 0),
      new Date(2026, 7, 10, 18, 30)
    )).toBe(true)
  })

  it('combines a local calendar date and a 24-hour time', () => {
    const combined = combineDateTime(new Date(2026, 7, 10), '09:30')
    expect(combined.getFullYear()).toBe(2026)
    expect(combined.getMonth()).toBe(7)
    expect(combined.getDate()).toBe(10)
    expect(combined.getHours()).toBe(9)
    expect(combined.getMinutes()).toBe(30)
  })
})
