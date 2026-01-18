// Types
export type { ApiEvent } from './types'
export { API_URL, apiEventToCalendarEvent, calendarEventToApiFormat } from './types'

// CRUD Operations
export { getEvents } from './getEvents'
export { createEvent } from './createEvent'
export { updateEvent } from './updateEvent'
export { deleteEvent } from './deleteEvent'

// Tek bir obje olarak export (opsiyonel)
import { getEvents } from './getEvents'
import { createEvent } from './createEvent'
import { updateEvent } from './updateEvent'
import { deleteEvent } from './deleteEvent'

export const eventService = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}
