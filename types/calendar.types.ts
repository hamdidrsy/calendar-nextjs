/**
 * Takvimde gösterilecek bir etkinlik
 */
export interface CalendarEvent {
    id: string;
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    color?: string;
}

/**
 * Takvimdeki bir gün
 */
export interface CalendarDay {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    events: CalendarEvent[];
}

/**
 * Bir ayın tüm bilgisi
 */
export interface CalendarMonth {
    year: number;
    month: number;
    days: CalendarDay[];
}

/**
 * Takvim görünüm tipleri
 */
export type CalendarViewType = 'month' | 'week' | 'day';
