"use client"

import { useState, useCallback } from 'react'
import type { CalendarEvent } from '@/types'
import { getEvents } from '@/services/events'

/**
 * Event state yonetimi icin hook
 */
export const useEventState = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Etkinlikleri API'den yukle
    const fetchEvents = useCallback(async () => {
        try {
            setIsLoading(true)
            setError(null)
            const data = await getEvents()
            setEvents(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Bir hata olustu')
            console.error('Etkinlikler yuklenirken hata:', err)
        } finally {
            setIsLoading(false)
        }
    }, [])

    // Hatayi temizle
    const clearError = useCallback(() => setError(null), [])

    // Belirli bir gune ait etkinlikleri getir
    const getEventsForDate = useCallback((date: Date): CalendarEvent[] => {
        return events.filter(event => {
            const eventDate = new Date(event.startDate)
            return (
                eventDate.getFullYear() === date.getFullYear() &&
                eventDate.getMonth() === date.getMonth() &&
                eventDate.getDate() === date.getDate()
            )
        })
    }, [events])

    return {
        events,
        setEvents,
        isLoading,
        setIsLoading,
        error,
        setError,
        fetchEvents,
        clearError,
        getEventsForDate
    }
}
