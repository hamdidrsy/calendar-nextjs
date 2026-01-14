import type { CalendarGridProps } from '@/types/props.types';
import { isSameDay } from '@/utils';
import { CalendarDay } from './CalendarDay';

// Takvimdeki günleri gösteren bileşen                     günleri, seçili tarihi, gün tıklama ve çift tıklama işleyicilerini alır
export const CalendarGrid: React.FC<CalendarGridProps> = ({ days, selectedDate, onDayClick, onDayDoubleClick, getEventsForDate, onEventClick }) => {
    return (
        <div className="calendar-days">
            {days.map((day, index) => (
                <CalendarDay
                    key={index}
                    day={day}
                    isSelected={selectedDate !== null && isSameDay(day.date, selectedDate)}
                    onClick={onDayClick}
                    onDoubleClick={onDayDoubleClick}
                    events={getEventsForDate(day.date)}
                    onEventClick={onEventClick}
                />
            ))}
        </div>
    );
};
