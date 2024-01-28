'use client'
import CancelTicketAction from '@/actions/tickets/CancelTicketAction'
import Ticket from '@/typings/Ticket'
import { WithId } from 'mongodb'
import RenderSimpleBike from './RenderSimpleBike'

export default function RenderTicket({ ticket }: { ticket: WithId<Ticket>; editable?: boolean; isPending?: boolean }) {
  return (
    <form className='relative max-w-2xl rounded-md bg-neutral-200/80 p-3 dark:bg-neutral-700/40'>
      <h2 className='border-b border-b-neutral-400 pb-2 text-xl font-semibold dark:border-b-neutral-600'>
        Ticket - <span className='text-sm font-normal'>{ticket._id.toString()}</span>
      </h2>

      <div>
        <div className='mt-2 flex flex-col gap-2'>
          <h2 className='text-lg font-semibold'>Rent Period</h2>
          <span className='text-sm italic'>{ticket.interval.start.toLocaleString()}</span>
          <span className='text-sm italic'>{ticket.interval.end.toLocaleString()}</span>
        </div>

        <div className='mt-2 flex flex-col gap-2'>
          <div className='flex flex-wrap gap-6 px-4'>
            {ticket.bikes.map((bike) => (
              <RenderSimpleBike className='rounded-md bg-neutral-300/60 p-4 dark:bg-neutral-700/80 ' key={bike._id.toString()} bike={bike} ignoredModelProps={['_id', 'reviews', 'name']} />
            ))}
          </div>
        </div>

        <div className='mt-4 flex flex-row items-center gap-2'>
          <h2 className='text-lg font-semibold'>Price</h2>
          <span className='text-sm italic'>€{ticket.price}</span>
        </div>
      </div>

      <button formAction={() => CancelTicketAction(ticket)} className='absolute bottom-3 right-3 mt-2 rounded-md bg-red-400/70 px-2 py-1 text-sm text-gray-700 dark:bg-red-600/70 dark:text-gray-200'>
        Cancel Ticket
      </button>
    </form>
  )
}
