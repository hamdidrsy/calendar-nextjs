"use client"

import { useState } from 'react';
import type { CalendarEvent } from '@/types';
import type { EventFormProps } from '@/types/props.types';
import { DEFAULT_START_TIME, DEFAULT_END_TIME } from '@/constants';
import './EventForm.css';

// Date'den saat string'i cikar (HH:MM)
const formatTimeFromDate = (date: Date): string => {
    const d = new Date(date);
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

export const EventForm: React.FC<EventFormProps> = ({ selectedDate, onSubmit, onCancel, event }) => {
    // Edit mode kontrolu
    const isEditMode = !!event;

    // State'leri mevcut event degerleriyle veya default degerlerle baslat
    const [title, setTitle] = useState(event?.title || '');
    const [description, setDescription] = useState(event?.description || '');
    const [startTime, setStartTime] = useState(
        event ? formatTimeFromDate(event.startDate) : DEFAULT_START_TIME
    );
    const [endTime, setEndTime] = useState(
        event ? formatTimeFromDate(event.endDate) : DEFAULT_END_TIME
    );
    const [error, setError] = useState('');

    // Benzersiz ID oluştur
    const generateId = () => {
        return 'evt_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
    };

    // Tarih ve saati birleştir
    const combineDateTime = (date: Date, time: string): Date => {
        const [hours, minutes] = time.split(':').map(Number);
        const combined = new Date(date);
        combined.setHours(hours, minutes, 0, 0);
        return combined;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validasyon
        if (!title.trim()) {
            setError('Başlık zorunludur');
            return;
        }

        const eventData: CalendarEvent = {
            id: event?.id || generateId(), // Edit modda mevcut id'yi kullan
            title: title.trim(),
            description: description.trim() || undefined,
            startDate: combineDateTime(selectedDate, startTime),
            endDate: combineDateTime(selectedDate, endTime),
        };

        console.log(isEditMode ? 'Etkinlik guncelleniyor:' : 'Yeni etkinlik:', eventData);
        onSubmit(eventData);

        // Sadece yeni etkinlik eklerken formu temizle
        if (!isEditMode) {
            setTitle('');
            setDescription('');
            setStartTime(DEFAULT_START_TIME);
            setEndTime(DEFAULT_END_TIME);
            setError('');
        }
    };

    // Seçili tarihi formatla
    const formattedDate = selectedDate.toLocaleDateString('tr-TR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <form className="event-form" onSubmit={handleSubmit}>
            <div className="event-form-date">
                {formattedDate}
            </div>

            {error && <div className="event-form-error">{error}</div>}

            <div className="form-group">
                <label htmlFor="title">Başlık *</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        setError('');
                    }}
                    placeholder="Etkinlik başlığı"
                    autoFocus
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Açıklama</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Etkinlik açıklaması (opsiyonel)"
                    rows={3}
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="startTime">Başlangıç</label>
                    <input
                        type="time"
                        id="startTime"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="endTime">Bitiş</label>
                    <input
                        type="time"
                        id="endTime"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                </div>
            </div>

            <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={onCancel}>
                    İptal
                </button>
                <button type="submit" className="btn-submit">
                    {isEditMode ? 'Guncelle' : 'Kaydet'}
                </button>
            </div>
        </form>
    );
};
