import type { CalendarDay } from '@/types';
import { LOCALE, CALENDAR_GRID_SIZE } from '@/constants';

/**
 * Belirtilen ay için takvim günlerini döndüren yardımcı fonksiyon
 */
export const getCalendarDays = (currentDate: Date): CalendarDay[] => {
    const currentYear = currentDate.getFullYear(); // Yıl bilgisi
    const currentMonth = currentDate.getMonth(); // Ay bilgisi (0-11 arası)
    const days: CalendarDay[] = []; // Takvimde gösterilecek günler
    const today = new Date(); // Bugünün tarihi

    // Ayın ilk gününün haftanın hangi gününe denk geldiğini buluyoruz
    // güncel yıl güncel ay ve 1. gün
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    let startDay = firstDayOfMonth.getDay();
    // Pazar 0 döner, bizde Pazartesi hafta başı olduğu için düzeltme
    startDay = startDay === 0 ? 7 : startDay;

    // 1. Önceki ayın günleri
    for (let i = startDay - 1; i > 0; i--) {
        const date = new Date(currentYear, currentMonth, 1 - i);
        days.push({
            date,
            isCurrentMonth: false,
            isToday: false,
            events: []
        });
    }

    // 2. Bu ayın günleri
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const totalDaysInMonth = lastDayOfMonth.getDate();

    for (let i = 1; i <= totalDaysInMonth; i++) {
        const date = new Date(currentYear, currentMonth, i);
        const isToday = isSameDay(date, today);

        days.push({
            date,
            isCurrentMonth: true,
            isToday,
            events: []
        });
    }

    // 3. Sonraki ayın günleri (grid'i tamamlamak için)
    const remainingDays = CALENDAR_GRID_SIZE - days.length;
    for (let i = 1; i <= remainingDays; i++) {
        const date = new Date(currentYear, currentMonth + 1, i);
        days.push({
            date,
            isCurrentMonth: false,
            isToday: false,
            events: []
        });
    }

    return days;
};

/**
 * Saati formatla (09:30)
 * neden? Çünkü farklı locale'lerde saat formatları değişebilir.
 * alternatif olarak toLocaleTimeString kullanılabilir.
 */
export const formatTime = (date: Date): string => {
    return new Date(date).toLocaleTimeString(LOCALE, {
        hour: '2-digit',
        minute: '2-digit'
    });
};

/**
 * Tarihi formatla (5 Ocak 2026 Pazartesi)
 */
export const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString(LOCALE, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

/**
 * Ay ve yılı formatla (Ocak 2026)
 */
export const formatMonthYear = (date: Date): string => {
    return date.toLocaleDateString(LOCALE, {
        month: 'long',
        year: 'numeric'
    });
};

/**
 * İki tarihin aynı gün olup olmadığını kontrol et
 * neden yapıyoruz ? çünkü tarih objeleri referans olarak farklı olabilir.
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
};

/**
 * Tarih ve saati birleştir
 * neden? Bazen sadece tarih objesi ve saat stringi ayrı olur, bunları birleştirmek için
 */
export const combineDateTime = (date: Date, time: string): Date => {
    const [hours, minutes] = time.split(':').map(Number);
    const combined = new Date(date);
    combined.setHours(hours, minutes, 0, 0);
    return combined;
};
