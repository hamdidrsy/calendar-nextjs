# RandevuTakvim

RandevuTakvim, etkinlik ve randevu yönetimi için geliştirilen Next.js tabanlı bir uygulamadır. Bu sürüm aylık takvim üzerinde etkinlik listeleme, oluşturma, düzenleme ve silme özelliklerini içerir.

> Proje henüz çok müşterili ticari sürüm değildir. Kullanıcı hesapları, işletme ayrımı, hizmet/uygunluk motoru ve ödeme altyapısı sonraki geliştirme aşamalarındadır.

## Teknolojiler

- Next.js 15 ve React 18
- TypeScript
- PostgreSQL
- Prisma ORM
- Vitest

## Gereksinimler

- Node.js 20 veya üzeri
- PostgreSQL veya Neon PostgreSQL

## Kurulum

Bağımlılıkları kurun:

```powershell
npm.cmd install
```

Ortam dosyasını oluşturun:

```powershell
Copy-Item .env.example .env
```

`.env` içindeki `DATABASE_URL` değerini gerçek PostgreSQL bağlantınızla değiştirin. `.env` dosyasını Git'e eklemeyin.

Prisma Client'ı üretip migration'ları uygulayın:

```powershell
npm.cmd run db:generate
npm.cmd run db:migrate
```

Geliştirme sunucusunu başlatın:

```powershell
npm.cmd run dev
```

Uygulama `http://localhost:3000` adresinde açılır.

## Komutlar

```powershell
npm.cmd run dev          # Geliştirme sunucusu
npm.cmd run build        # Production derlemesi
npm.cmd run start        # Production sunucusu
npm.cmd run lint         # ESLint kontrolü
npm.cmd run typecheck    # TypeScript kontrolü
npm.cmd run test         # Testleri bir kez çalıştır
npm.cmd run test:watch   # Testleri izleme modunda çalıştır
npm.cmd run check        # Lint + typecheck + test
npm.cmd run db:generate  # Prisma Client üret
npm.cmd run db:migrate   # Mevcut migration'ları uygula
npm.cmd run db:studio    # Prisma Studio
```

## Ortam değişkenleri

| Değişken | Zorunlu | Açıklama |
|---|---:|---|
| `DATABASE_URL` | Evet | PostgreSQL bağlantı adresi |
| `NEXT_PUBLIC_APP_URL` | Production'da | Uygulamanın halka açık adresi |
| `NEXT_PUBLIC_APP_NAME` | Hayır | Görünen ürün adı |

## API

| Metot | Adres | Açıklama |
|---|---|---|
| `GET` | `/api/events` | Bütün etkinlikleri getirir |
| `GET` | `/api/events?startDate=2026-08-01&endDate=2026-08-31` | Tarih aralığını getirir |
| `POST` | `/api/events` | Etkinlik oluşturur |
| `GET` | `/api/events/:id` | Tek etkinliği getirir |
| `PUT` | `/api/events/:id` | Etkinliği tamamen günceller |
| `DELETE` | `/api/events/:id` | Etkinliği siler |

Etkinlik oluşturma/güncelleme gövdesi:

```json
{
  "title": "Ön görüşme",
  "description": "İlk değerlendirme",
  "date": "2026-08-10",
  "startTime": "09:00",
  "endTime": "10:00",
  "color": "#3788d8"
}
```

Tarih API boyunca `YYYY-MM-DD`, saat ise 24 saatlik `HH:mm` biçimindedir. Veritabanındaki gün alanı UTC gece yarısına normalize edilir.

## Klasör yapısı

- `app/`: Sayfalar, hata sınırları ve API rotaları
- `components/`: Takvim, form, modal ve ortak UI bileşenleri
- `hooks/`: Takvim ve etkinlik state yönetimi
- `services/`: Tarayıcı–API iletişimi ve veri dönüşümü
- `lib/`: Prisma, ortam ve request doğrulama yardımcıları
- `prisma/`: Veritabanı şeması ve migration'lar
- `types/`: Paylaşılan TypeScript tipleri
- `utils/`: Tarih yardımcıları
- `tests/`: Otomatik testler

## Production kontrolü

Dağıtımdan önce:

```powershell
npm.cmd run check
npm.cmd run build
npm.cmd run db:migrate
```
