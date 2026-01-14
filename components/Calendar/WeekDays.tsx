import React from 'react';
import { WEEK_DAYS } from '@/constants';

// Haftanın günlerini gösteren bileşen
export const WeekDays: React.FC = () => {
    return (
        <div className="calendar-weekdays">
            {WEEK_DAYS.map(day => (
                <div key={day} className="weekday">{day}</div>
            ))}
        </div>
    );
};
