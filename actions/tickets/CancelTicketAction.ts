'use server'
import { deleteTicket } from '@/lib/tickets/TicketsDAO'
import Ticket from '@/typings/Ticket'
import { ObjectId, WithId } from 'mongodb'
import { revalidateTag } from 'next/cache'

export default async function CancelTicketAction(ticket: WithId<Ticket>) {
  await deleteTicket(new ObjectId(ticket._id.toString()))
  revalidateTag('manage-stations')
  revalidateTag('tickets')
}
