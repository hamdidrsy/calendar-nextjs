"use client"

import { useState, useEffect, useCallback } from 'react'
import type { CalendarEvent } from '@/types'
import * as eventService from '@/services/eventService'

/**
 * Etkinlik CRUD islemleri icin custom hook
 * Artik API ile haberlesir
 */
export const useEvents = () => {
    // State tanimlari
    const [events, setEvents] = useState<CalendarEvent[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Etkinlikleri API'den yukle
    const fetchEvents = useCallback(async () => {
        try {
            setIsLoading(true)
            setError(null)
            const data = await eventService.getEvents()
            setEvents(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Bir hata olustu')
            console.error('Etkinlikler yuklenirken hata:', err)
        } finally {
            setIsLoading(false)
        }
    }, [])

    // Component mount oldugunda etkinlikleri yukle
    useEffect(() => {
        fetchEvents()
    }, [fetchEvents])

    // Etkinlik ekleme fonksiyonu
    const addEvent = async (event: Omit<CalendarEvent, 'id'>) => {
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
    }

    // Etkinlik silme fonksiyonu
    const deleteEvent = async (eventId: string) => {
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
    }

    // Etkinlik guncelleme fonksiyonu
    const updateEvent = async (eventId: string, updates: Partial<CalendarEvent>) => {
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
    }

    // Belirli bir gune ait etkinlikleri getir
    const getEventsForDate = (date: Date): CalendarEvent[] => {
        return events.filter(event => {
            const eventDate = new Date(event.startDate)
            return (
                eventDate.getFullYear() === date.getFullYear() &&
                eventDate.getMonth() === date.getMonth() &&
                eventDate.getDate() === date.getDate()
            )
        })
    }

    // Hatayi temizle
    const clearError = () => setError(null)

    // Yeniden yukle
    const refresh = () => fetchEvents()

    return {
        events,
        isLoading,
        error,
        addEvent,
        deleteEvent,
        updateEvent,
        getEventsForDate,
        clearError,
        refresh
    }
}