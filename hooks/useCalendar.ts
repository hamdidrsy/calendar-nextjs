"use client"

import { useState } from 'react';
import { getCalendarDays } from '@/utils/dateUtils';

/**
 * Takvim navigasyonu için custom hook
 * Sadece ay/gün geçişleri ve tarih seçimi ile ilgilenir
 */
export const useCalendar = () => {
    // Mevcut tarihi state olarak tutuyoruz
    const [currentDate, setCurrentDate] = useState(new Date());

    // Seçili günü state olarak tutuyoruz
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // Takvimde gösterilecek günleri hesaplıyoruz
    const days = getCalendarDays(currentDate);

    // Sonraki aya geç
    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    // Önceki aya geç
    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    // UI'da başlıkta göstermek için formatlanmış tarih başlığı
    const formattedDate = currentDate.toLocaleDateString('tr-TR', {
        month: 'long',
        year: 'numeric'
    });

    // Gün seçme fonksiyonu
    const selectDate = (date: Date) => {
        setSelectedDate(date);
        console.log(`Seçilen tarih: ${date.toLocaleDateString('tr-TR')}`);
    };

    return {
        currentDate,
        formattedDate,
        days,
        nextMonth,
        prevMonth,
        selectedDate,
        selectDate
    };
};
