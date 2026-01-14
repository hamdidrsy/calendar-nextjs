"use client"

import { useState } from 'react';
import type { CalendarEvent } from '@/types';

/**
 * Etkinlik CRUD işlemleri için custom hook
 */
export const useEvents = () => {
    // Etkinlikleri state olarak tutuyoruz
    // useState ? React'te bir state değişkeni oluşturmak için kullanılan hook'tur.
    const [events, setEvents] = useState<CalendarEvent[]>([]);

    // Etkinlik ekleme fonksiyonu
    const addEvent = (event: CalendarEvent) => {
        // Yeni etkinliği mevcut etkinlikler listesine ekle
        setEvents(prevEvents => [...prevEvents, event]);
        console.log('Etkinlik eklendi:', event.title);
    };

    // Etkinlik silme fonksiyonu
    const deleteEvent = (eventId: string) => {
        setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
        console.log('Etkinlik silindi:', eventId);
    };

    // Etkinlik güncelleme fonksiyonu
    const updateEvent = (eventId: string, updates: Partial<CalendarEvent>) => {
        setEvents(prevEvents =>
            prevEvents.map(event =>
                event.id === eventId ? { ...event, ...updates } : event
            )
        );
        console.log('Etkinlik güncellendi:', eventId);
    };

    // Belirli bir güne ait etkinlikleri getir
    const getEventsForDate = (date: Date): CalendarEvent[] => {
        return events.filter(event => {
            const eventDate = new Date(event.startDate);
            return (
                eventDate.getFullYear() === date.getFullYear() &&
                eventDate.getMonth() === date.getMonth() &&
                eventDate.getDate() === date.getDate()
            );
        });
    };

    return {
        events,
        addEvent,
        deleteEvent,
        updateEvent,
        getEventsForDate
    };
};
