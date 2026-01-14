"use client"

import React from 'react';
import type { CalendarHeaderProps } from '@/types/props.types';

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ dateDisplay, onNext, onPrev }) => {
    return (
        <div className="calendar-header">
            <button onClick={onPrev}>◀</button>
            <h2>{dateDisplay}</h2>
            <button onClick={onNext}>▶</button>
        </div>
    );
};
