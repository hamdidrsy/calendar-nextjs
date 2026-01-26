import type React from 'react';
import type { CalendarDay, CalendarEvent } from './calendar.types';

/**
 * Modal bileşeni props
 */
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

/**
 * EventForm bileşeni props
 */
export interface EventFormProps {
    selectedDate: Date;
    onSubmit: (event: CalendarEvent) => void;
    onCancel: () => void;
    /** Duzenleme modu icin mevcut etkinlik */
    event?: CalendarEvent;
}

/**
 * EventDetail bileşeni props
 */
export interface EventDetailProps {
    event: CalendarEvent;
    onClose: () => void;
    onDelete: () => void;
    onEdit: () => void;
}

/**
 * CalendarHeader bileşeni props
 */
export interface CalendarHeaderProps {
    dateDisplay: string;
    onNext: () => void;
    onPrev: () => void;
}

/**
 * CalendarGrid bileşeni props
 */
export interface CalendarGridProps {
    days: CalendarDay[];
    selectedDate: Date | null;
    onDayClick: (date: Date) => void;
    onDayDoubleClick: (date: Date) => void;
    getEventsForDate: (date: Date) => CalendarEvent[];
    onEventClick: (event: CalendarEvent) => void;
}

/**
 * CalendarDay bileşeni props
 */
export interface CalendarDayProps {
    day: CalendarDay;
    isSelected: boolean;
    onClick: (date: Date) => void;
    onDoubleClick: (date: Date) => void;
    events: CalendarEvent[];
    onEventClick: (event: CalendarEvent) => void;
}
