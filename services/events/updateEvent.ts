import type { CalendarEvent } from '@/types'
import { API_URL, ApiEvent, apiEventToCalendarEvent, calendarEventToApiFormat } from './types'

/**
 * Etkinlik guncelle
 */
export async function updateEvent(
    id: string,
    updates: CalendarEvent
): Promise<CalendarEvent> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(calendarEventToApiFormat(updates))
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Etkinlik guncellenirken hata olustu')
    }

    const apiEvent: ApiEvent = await response.json()
    return apiEventToCalendarEvent(apiEvent)
}
