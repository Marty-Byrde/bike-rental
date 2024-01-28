import { getTickets } from '@/lib/tickets/TicketsDAO'
import RenderTicket from '../(components)/tickets/RenderTicket'

export default async function TicketsPage() {
  const tickets = await getTickets()

  return (
    <div>
      <h1 className='mb-8 text-center text-3xl font-semibold lg:text-left'>My Tickets</h1>
      <div>
        {tickets.map((ticket) => (
          <RenderTicket ticket={ticket} key={ticket._id.toString()} />
        ))}
      </div>
    </div>
  )
}
