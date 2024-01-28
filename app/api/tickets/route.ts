import { getTickets } from '@/lib/tickets/TicketsDAO'
import { NextResponse } from 'next/server'

export async function GET() {
  const tickets = await getTickets()
  return NextResponse.json(tickets)
}
