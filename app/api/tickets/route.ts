import { getTickets } from '@/lib/tickets/TicketsDAO'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const tickets = await getTickets()
  return NextResponse.json(tickets)
}
