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

// API Event'i Frontend CalendarEvent'e donustur
export function apiEventToCalendarEvent(apiEvent: ApiEvent): CalendarEvent {
    const date = new Date(apiEvent.date)

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
        date: startDate.toISOString(),
        startTime: startDate.toTimeString().slice(0, 5), // "HH:MM" formati
        endTime: new Date(event.endDate).toTimeString().slice(0, 5),
        color: event.color || '#3788d8'
    }
}
