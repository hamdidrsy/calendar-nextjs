import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// Route parametrelerinin tipi
type RouteParams = {
    params: Promise<{ id: string }>
}

// GET /api/events/[id] - Tek etkinlik getir
export async function GET(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        const { id } = await params

        const event = await prisma.event.findUnique({
            where: { id }
        })

        if (!event) {
            return NextResponse.json(
                { error: 'Etkinlik bulunamadi' },
                { status: 404 }
            )
        }

        return NextResponse.json(event)
    } catch (error) {
        console.error('Event GET error:', error)
        return NextResponse.json(
            { error: 'Etkinlik getirilirken hata olustu' },
            { status: 500 }
        )
    }
}

// PUT /api/events/[id] - Etkinlik guncelle
export async function PUT(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        const { id } = await params
        const body = await request.json()

        // Etkinligin var olup olmadigini kontrol et
        const existingEvent = await prisma.event.findUnique({
            where: { id }
        })

        if (!existingEvent) {
            return NextResponse.json(
                { error: 'Etkinlik bulunamadi' },
                { status: 404 }
            )
        }

        // Etkinligi guncelle
        const updatedEvent = await prisma.event.update({
            where: { id },
            data: {
                title: body.title ?? existingEvent.title,
                description: body.description ?? existingEvent.description,
                date: body.date ? new Date(body.date) : existingEvent.date,
                startTime: body.startTime ?? existingEvent.startTime,
                endTime: body.endTime ?? existingEvent.endTime,
                color: body.color ?? existingEvent.color
            }
        })

        return NextResponse.json(updatedEvent)
    } catch (error) {
        console.error('Event PUT error:', error)
        return NextResponse.json(
            { error: 'Etkinlik guncellenirken hata olustu' },
            { status: 500 }
        )
    }
}

// DELETE /api/events/[id] - Etkinlik sil
export async function DELETE(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        const { id } = await params

        // Etkinligin var olup olmadigini kontrol et
        const existingEvent = await prisma.event.findUnique({
            where: { id }
        })

        if (!existingEvent) {
            return NextResponse.json(
                { error: 'Etkinlik bulunamadi' },
                { status: 404 }
            )
        }

        // Etkinligi sil
        await prisma.event.delete({
            where: { id }
        })

        return NextResponse.json(
            { message: 'Etkinlik basariyla silindi' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Event DELETE error:', error)
        return NextResponse.json(
            { error: 'Etkinlik silinirken hata olustu' },
            { status: 500 }
        )
    }
}