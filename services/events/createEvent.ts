import type { CalendarEvent } from '@/types'
import { API_URL, ApiEvent, apiEventToCalendarEvent, calendarEventToApiFormat } from './types'

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
