import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerEnv } from '@/lib/env'
import {
  dateOnlyToUtc,
  RequestValidationError,
  validateEventInput,
} from '@/lib/eventValidation'

type RouteParams = {
  params: Promise<{ id: string }>
}

function validationResponse(error: RequestValidationError) {
  return NextResponse.json(
    { error: error.message, details: error.details },
    { status: 400 }
  )
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    getServerEnv()
    const { id } = await params
    const event = await prisma.event.findUnique({ where: { id } })

    if (!event) {
      return NextResponse.json({ error: 'Etkinlik bulunamadı.' }, { status: 404 })
    }

    return NextResponse.json(event)
  } catch (error) {
    console.error('Etkinlik getirilemedi:', error)
    return NextResponse.json({ error: 'Etkinlik getirilemedi.' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    getServerEnv()
    const { id } = await params
    const input = validateEventInput(await request.json())
    const existingEvent = await prisma.event.findUnique({ where: { id } })

    if (!existingEvent) {
      return NextResponse.json({ error: 'Etkinlik bulunamadı.' }, { status: 404 })
    }

    const event = await prisma.event.update({
      where: { id },
      data: {
        ...input,
        date: dateOnlyToUtc(input.date),
      },
    })

    return NextResponse.json(event)
  } catch (error) {
    if (error instanceof RequestValidationError) return validationResponse(error)
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Geçerli bir JSON gövdesi gönderin.' }, { status: 400 })
    }
    console.error('Etkinlik güncellenemedi:', error)
    return NextResponse.json({ error: 'Etkinlik güncellenemedi.' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    getServerEnv()
    const { id } = await params
    const existingEvent = await prisma.event.findUnique({ where: { id } })

    if (!existingEvent) {
      return NextResponse.json({ error: 'Etkinlik bulunamadı.' }, { status: 404 })
    }

    await prisma.event.delete({ where: { id } })
    return NextResponse.json({ message: 'Etkinlik başarıyla silindi.' })
  } catch (error) {
    console.error('Etkinlik silinemedi:', error)
    return NextResponse.json({ error: 'Etkinlik silinemedi.' }, { status: 500 })
  }
}
