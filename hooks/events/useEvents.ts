"use client"

import { useEffect } from 'react'
import { useEventState } from './useEventState'
import { useEventActions } from './useEventActions'

/**
 * Etkinlik CRUD islemleri icin ana hook
 * State ve actions hook'larini birlestirir
 */
export const useEvents = () => {
    const {
        events,
        setEvents,
        isLoading,
        error,
        setError,
        fetchEvents,
        clearError,
        getEventsForDate
    } = useEventState()

    const {
        addEvent,
        deleteEvent,
        updateEvent
    } = useEventActions({ setEvents, setError })

    // Component mount oldugunda etkinlikleri yukle
    useEffect(() => {
        fetchEvents()
    }, [fetchEvents])

    return {
        // State
        events,
        isLoading,
        error,
        // Actions
        addEvent,
        deleteEvent,
        updateEvent,
        // Utilities
        getEventsForDate,
        clearError,
        refresh: fetchEvents
    }
}
