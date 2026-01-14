/**
 * Uygulama genelinde kullanılan sabit değerler
 */

// Hafta günleri (kısa)
//as const ifadesi, TypeScript'e bu dizinin elemanlarının değiştirilemez olduğunu belirtir.
export const WEEK_DAYS = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'] as const;

// Hafta günleri (uzun)
export const WEEK_DAYS_FULL = [
    'Pazartesi', 'Salı', 'Çarşamba',
    'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'
] as const;

// Ay isimleri
export const MONTHS = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
] as const;

// Form varsayılan değerleri
export const DEFAULT_START_TIME = '09:00';
export const DEFAULT_END_TIME = '15:00';

// Takvim grid boyutu (6 hafta x 7 gün)
export const CALENDAR_GRID_SIZE = 42;

// Locale ayarı
export const LOCALE = 'tr-TR';
