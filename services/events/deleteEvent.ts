import { API_URL } from './types'

/**
 * Etkinlik sil
 */
export async function deleteEvent(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Etkinlik silinirken hata olustu')
    }
}
