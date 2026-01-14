import type { CalendarDay, CalendarEvent } from './calendar.types';

/**
 * useCalendar hook return tipi
 */
export interface UseCalendarReturn {
    currentDate: Date;
    formattedDate: string;
    days: CalendarDay[];
    nextMonth: () => void;
    prevMonth: () => void;
    selectedDate: Date | null;
    selectDate: (date: Date) => void;
}

/**
 * useEvents hook return tipi
 */
export interface UseEventsReturn {
    events: CalendarEvent[];
    addEvent: (event: CalendarEvent) => void;
    deleteEvent: (id: string) => void;
    updateEvent: (id: string, updates: Partial<CalendarEvent>) => void;
    getEventsForDate: (date: Date) => CalendarEvent[];
}

/**
 * useModal hook return tipi
 */
export interface UseModalReturn {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
}
