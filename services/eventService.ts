import type { CalendarEvent } from '@/types'

// API'den gelen Event tipi (Prisma modeli)
interface ApiEvent {
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

// API Event'i Frontend CalendarEvent'e donustur
function apiEventToCalendarEvent(apiEvent: ApiEvent): CalendarEvent {
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
function calendarEventToApiFormat(event: Omit<CalendarEvent, 'id'> & { id?: string }) {
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

// API Base URL
const API_URL = '/api/events'

/**
 * Tum etkinlikleri getir
 */
export async function getEvents(): Promise<CalendarEvent[]> {
    const response = await fetch(API_URL)

    if (!response.ok) {
        throw new Error('Etkinlikler yuklenirken hata olustu')
    }

    const apiEvents: ApiEvent[] = await response.json()
    return apiEvents.map(apiEventToCalendarEvent)
}

/**
 * Yeni etkinlik olustur
 */
export async function createEvent(
    event: Omit<CalendarEvent, 'id'>
): Promise<CalendarEvent> {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(calendarEventToApiFormat(event))
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Etkinlik olusturulurken hata olustu')
    }

    const apiEvent: ApiEvent = await response.json()
    return apiEventToCalendarEvent(apiEvent)
}

/**
 * Etkinlik guncelle
 */
export async function updateEvent(
    id: string,
    updates: Partial<CalendarEvent>
): Promise<CalendarEvent> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(calendarEventToApiFormat(updates as CalendarEvent))
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Etkinlik guncellenirken hata olustu')
    }

    const apiEvent: ApiEvent = await response.json()
    return apiEventToCalendarEvent(apiEvent)
}

/**
 * Etkinlik sil
 */
export async function deleteEvent(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Etkinlik silinirken hata olustu')
    }
}

// Tek bir obje olarak export et (opsiyonel)
export const eventService = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}