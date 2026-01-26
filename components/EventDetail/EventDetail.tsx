"use client"

import { formatDate, formatTime } from '@/utils';
import type { EventDetailProps } from '@/types/props.types';
import './EventDetail.css';

export const EventDetail: React.FC<EventDetailProps> = ({ event, onClose, onDelete, onEdit }) => {
    return (
        <div className="event-detail">
            <h3 className="event-detail-title">{event.title}</h3>

            <div className="event-detail-info">
                <div className="event-detail-row">
                    <span className="event-detail-label">Tarih:</span>
                    <span>{formatDate(event.startDate)}</span>
                </div>
                <div className="event-detail-row">
                    <span className="event-detail-label">Saat:</span>
                    <span>
                        {formatTime(event.startDate)} - {formatTime(event.endDate)}
                    </span>
                </div>
                {event.description && (
                    <div className="event-detail-row">
                        <span className="event-detail-label">Açıklama:</span>
                        <span>{event.description}</span>
                    </div>
                )}
            </div>

            <div className="event-detail-actions">
                <button className="btn-cancel" onClick={onClose}>
                    Kapat
                </button>
                <button className="btn-edit" onClick={onEdit}>
                    Duzenle
                </button>
                <button className="btn-delete" onClick={onDelete}>
                    Sil
                </button>
            </div>
        </div>
    );
};
