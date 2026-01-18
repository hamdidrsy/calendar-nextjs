import type { CalendarEvent } from '@/types'
import { API_URL, ApiEvent, apiEventToCalendarEvent } from './types'

/**
 * Tum etkinlikleri getir
 */
export async function getEvents(): Promise<CalendarEvent[]> {
    const response = await fetch(API_URL)
    const data = await response.json()

    if (!response.ok) {
        console.error('API Error:', response.status, data)
        throw new Error(data.error || 'Etkinlikler yuklenirken hata olustu')
    }

    const apiEvents: ApiEvent[] = data
    return apiEvents.map(apiEventToCalendarEvent)
}
