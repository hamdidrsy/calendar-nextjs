// Re-export from new location for backwards compatibility
export {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    eventService,
    API_URL,
    apiEventToCalendarEvent,
    calendarEventToApiFormat
} from './events'

export type { ApiEvent } from './events'
