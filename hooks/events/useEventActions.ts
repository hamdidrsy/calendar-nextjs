"use client"

import { useCallback } from 'react'
import type { CalendarEvent } from '@/types'
import * as eventService from '@/services/events'

interface UseEventActionsProps {
    setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>
    setError: React.Dispatch<React.SetStateAction<string | null>>
}

/**
 * Event CRUD actions icin hook
 */
export const useEventActions = ({ setEvents, setError }: UseEventActionsProps) => {
    // Etkinlik ekleme
    const addEvent = useCallback(async (event: Omit<CalendarEvent, 'id'>) => {
        try {
            setError(null)
            const newEvent = await eventService.createEvent(event)
            setEvents(prev => [...prev, newEvent])
            console.log('Etkinlik eklendi:', newEvent.title)
            return newEvent
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Etkinlik eklenemedi'
            setError(message)
            console.error('Etkinlik eklenirken hata:', err)
            throw err
        }
    }, [setEvents, setError])

    // Etkinlik silme
    const deleteEvent = useCallback(async (eventId: string) => {
        try {
            setError(null)
            await eventService.deleteEvent(eventId)
            setEvents(prev => prev.filter(event => event.id !== eventId))
            console.log('Etkinlik silindi:', eventId)
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Etkinlik silinemedi'
            setError(message)
            console.error('Etkinlik silinirken hata:', err)
            throw err
        }
    }, [setEvents, setError])

    // Etkinlik guncelleme
    const updateEvent = useCallback(async (eventId: string, updates: Partial<CalendarEvent>) => {
        try {
            setError(null)
            const updatedEvent = await eventService.updateEvent(eventId, updates)
            setEvents(prev =>
                prev.map(event =>
                    event.id === eventId ? updatedEvent : event
                )
            )
            console.log('Etkinlik guncellendi:', eventId)
            return updatedEvent
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Etkinlik guncellenemedi'
            setError(message)
            console.error('Etkinlik guncellenirken hata:', err)
            throw err
        }
    }, [setEvents, setError])

    return {
        addEvent,
        deleteEvent,
        updateEvent
    }
}
