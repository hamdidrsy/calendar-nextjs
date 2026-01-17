import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/events - Tum etkinlikleri getir
export async function GET(request: NextRequest) {
    console.log('API /api/events GET called')
    try {
        console.log('Prisma query starting...')
        // URL parametrelerini al (opsiyonel filtreleme icin)
        const { searchParams } = new URL(request.url) // URL'den searchParams al
        const startDate = searchParams.get('startDate') // Baslangic tarihi
        const endDate = searchParams.get('endDate') // Bitis tarihi

        // Filtreleme kosullarini olustur
        //any burada belirsizlik icin kullanildi, gerekli tip guvenligi saglanabilir
        // önce type kontrolü yapılabilir sonra atama yapılabilir sonra da gerekli dönüşümler yapılabilir.
        const where: any = {}

        if (startDate && endDate) {
            where.date = {
                gte: new Date(startDate),
                lte: new Date(endDate)
            }
        }

        // Veritabanindan etkinlikleri getir
        const events = await prisma.event.findMany({
            where,
            orderBy: {
                date: 'asc'  // Tarihe gore sirala
            }
        })

        return NextResponse.json(events)
    } catch (error) {
        console.error('Events GET error:', error)
        const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata'
        return NextResponse.json(
            { error: 'Etkinlikler getirilirken hata olustu', details: errorMessage },
            { status: 500 }
        )
    }
}

// POST /api/events - Yeni etkinlik olustur
export async function POST(request: NextRequest) {
    try {
        // Request body'den veriyi al
        const body = await request.json()

        // Zorunlu alanlari kontrol et
        // require(body.title)
        // require(body.date)

        if (!body.title || !body.date) {
            return NextResponse.json(
                { error: 'Baslik ve tarih zorunludur' },
                { status: 400 }
            )
        }

        // Yeni etkinlik olustur
        const event = await prisma.event.create({
            data: {
                title: body.title,
                description: body.description || null,
                date: new Date(body.date),
                startTime: body.startTime || null,
                endTime: body.endTime || null,
                color: body.color || '#3788d8'
            }
        })

        return NextResponse.json(event, { status: 201 })
    } catch (error) {
        console.error('Events POST error:', error)
        return NextResponse.json(
            { error: 'Etkinlik olusturulurken hata olustu' },
            { status: 500 }
        )
    }
}