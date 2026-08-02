import type { CalendarEvent } from '@/types'

// API'den gelen Event tipi (Prisma modeli)
export interface ApiEvent {
    id: string
    title: string
    description: string | null
    date: string  // ISO string
    startTime: string | null
    endTime: string | null
    color: string
    createdAt: string
    updatedAt: string
}

// API Base URL
export const API_URL = '/api/events'

function parseDateOnly(value: string): Date {
    const [year, month, day] = value.slice(0, 10).split('-').map(Number)
    return new Date(year, month - 1, day)
}

function formatDateOnly(value: Date): string {
    const date = new Date(value)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

function formatLocalTime(value: Date): string {
    const date = new Date(value)
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
}

// API Event'i Frontend CalendarEvent'e donustur
export function apiEventToCalendarEvent(apiEvent: ApiEvent): CalendarEvent {
    const date = parseDateOnly(apiEvent.date)

    // startDate olustur
    const startDate = new Date(date)
    if (apiEvent.startTime) {
        const [hours, minutes] = apiEvent.startTime.split(':')
        startDate.setHours(parseInt(hours), parseInt(minutes))
    }

    // endDate olustur
    const endDate = new Date(date)
    if (apiEvent.endTime) {
        const [hours, minutes] = apiEvent.endTime.split(':')
        endDate.setHours(parseInt(hours), parseInt(minutes))
    } else {
        // endTime yoksa startDate'ten 1 saat sonra
        endDate.setTime(startDate.getTime() + 60 * 60 * 1000)
    }

    return {
        id: apiEvent.id,
        title: apiEvent.title,
        description: apiEvent.description || undefined,
        startDate,
        endDate,
        color: apiEvent.color
    }
}

// Frontend CalendarEvent'i API formatina donustur
export function calendarEventToApiFormat(event: Omit<CalendarEvent, 'id'> & { id?: string }) {
    const startDate = new Date(event.startDate)

    return {
        title: event.title,
        description: event.description || null,
        date: formatDateOnly(startDate),
        startTime: formatLocalTime(startDate),
        endTime: formatLocalTime(event.endDate),
        color: event.color || '#3788d8'
    }
}
