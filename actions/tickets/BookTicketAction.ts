'use server'
import { createTicket } from '@/lib/tickets/TicketsDAO'
import Ticket from '@/typings/Ticket'
import { revalidateTag } from 'next/cache'

export default async function BookTicketAction(ticket: Ticket) {
  await createTicket(ticket)
  revalidateTag('manage-stations')
  revalidateTag('tickets')
}
