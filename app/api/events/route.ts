import type { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerEnv } from '@/lib/env'
import {
  dateOnlyToUtc,
  RequestValidationError,
  validateDateRange,
  validateEventInput,
} from '@/lib/eventValidation'

function validationResponse(error: RequestValidationError) {
  return NextResponse.json(
    { error: error.message, details: error.details },
    { status: 400 }
  )
}

// GET /api/events?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
export async function GET(request: NextRequest) {
  try {
    getServerEnv()
    const { searchParams } = request.nextUrl
    const dateRange = validateDateRange(
      searchParams.get('startDate'),
      searchParams.get('endDate')
    )
    const where: Prisma.EventWhereInput = dateRange ? { date: dateRange } : {}

    const events = await prisma.event.findMany({
      where,
      orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
    })

    return NextResponse.json(events)
  } catch (error) {
    if (error instanceof RequestValidationError) return validationResponse(error)
    console.error('Etkinlikler getirilemedi:', error)
    return NextResponse.json(
      { error: 'Etkinlikler getirilemedi.' },
      { status: 500 }
    )
  }
}

// POST /api/events
export async function POST(request: NextRequest) {
  try {
    getServerEnv()
    const input = validateEventInput(await request.json())
    const event = await prisma.event.create({
      data: {
        ...input,
        date: dateOnlyToUtc(input.date),
      },
    })

    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    if (error instanceof RequestValidationError) return validationResponse(error)
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Geçerli bir JSON gövdesi gönderin.' }, { status: 400 })
    }
    console.error('Etkinlik oluşturulamadı:', error)
    return NextResponse.json(
      { error: 'Etkinlik oluşturulamadı.' },
      { status: 500 }
    )
  }
}
