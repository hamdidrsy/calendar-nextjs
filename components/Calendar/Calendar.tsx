"use client"

import React, { useState } from 'react';
import { useCalendar, useEvents, useModal, useToast } from '@/hooks';
import { Modal } from '@/components/Modal';
import { EventForm } from '@/components/EventForm';
import { EventDetail } from '@/components/EventDetail';
import { LoadingSpinner, ErrorMessage, ToastContainer } from '@/components/ui';
import { CalendarHeader } from './CalendarHeader';
import { WeekDays } from './WeekDays';
import { CalendarGrid } from './CalendarGrid';
import type { CalendarEvent } from '@/types';
import './Calendar.css';

export const Calendar: React.FC = () => {
    // Takvim navigasyonu hook'u
    const {
        days, // Ay içindeki günler
        formattedDate, // Görüntülenen ayın formatlanmış hali
        nextMonth, // Sonraki aya geçiş fonksiyonu
        prevMonth, // Önceki aya geçiş fonksiyonu
        selectedDate, // Seçili tarih
        selectDate // Tarih seçme fonksiyonu
    } = useCalendar();

    // Etkinlik yönetimi hook'u
    const { addEvent, deleteEvent, getEventsForDate, isLoading, error, clearError, refresh } = useEvents();

    // Toast bildirimleri
    const { toasts, hideToast, success, error: showError } = useToast();

    // Modal state'leri
    const addEventModal = useModal();
    // Seçili etkinlik state'i (detay modal için)
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

    // Etkinlik ekleme handler'ı
    const handleAddEvent = async (event: CalendarEvent) => {
        try {
            // id hariç event bilgilerini gönder (API id'yi oluşturacak)
            const { id, ...eventData } = event;
            await addEvent(eventData);
            addEventModal.close();
            success('Etkinlik basariyla eklendi!');
        } catch (err) {
            showError('Etkinlik eklenirken hata olustu');
            console.error('Etkinlik eklenirken hata:', err);
        }
    };

    // Gune cift tiklama handler'i - modal'i acar
    const handleDayDoubleClick = (date: Date) => {
        selectDate(date);
        addEventModal.open();
    };

    // Etkinlige tiklama handler'i
    const handleEventClick = (event: CalendarEvent) => {
        setSelectedEvent(event);
    };

    // Etkinlik silme handler'i
    const handleDeleteEvent = async () => {
        if (selectedEvent) {
            try {
                await deleteEvent(selectedEvent.id);
                setSelectedEvent(null);
                success('Etkinlik silindi');
            } catch (err) {
                showError('Etkinlik silinirken hata olustu');
                console.error('Etkinlik silinirken hata:', err);
            }
        }
    };

    // Loading durumu
    if (isLoading) {
        return (
            <div className="calendar">
                <LoadingSpinner size="large" text="Etkinlikler yukleniyor..." />
            </div>
        );
    }

    return (
        <div className="calendar">
            {/* Hata mesajı */}
            {error && (
                <ErrorMessage
                    message={error}
                    onRetry={refresh}
                    onDismiss={clearError}
                />
            )}

            <CalendarHeader
                dateDisplay={formattedDate}
                onNext={nextMonth}
                onPrev={prevMonth}
            />

            <WeekDays />

            <CalendarGrid
                days={days}
                selectedDate={selectedDate}
                onDayClick={selectDate}
                onDayDoubleClick={handleDayDoubleClick}
                getEventsForDate={getEventsForDate}
                onEventClick={handleEventClick}
            />

            {/* Etkinlik Ekleme Modal'ı */}
            <Modal
                isOpen={addEventModal.isOpen}
                onClose={addEventModal.close}
                title="Yeni Etkinlik"
            >
                {selectedDate && (
                    <EventForm
                        selectedDate={selectedDate}
                        onSubmit={handleAddEvent}
                        onCancel={addEventModal.close}
                    />
                )}
            </Modal>

            {/* Etkinlik Detay Modal'ı */}
            <Modal
                isOpen={selectedEvent !== null}
                onClose={() => setSelectedEvent(null)}
                title="Etkinlik Detayı"
            >
                {selectedEvent && (
                    <EventDetail
                        event={selectedEvent}
                        onClose={() => setSelectedEvent(null)}
                        onDelete={handleDeleteEvent}
                    />
                )}
            </Modal>

            {/* Toast Bildirimleri */}
            <ToastContainer toasts={toasts} onClose={hideToast} />
        </div>
    );
};
