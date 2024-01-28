import BookTicketAction from '@/actions/tickets/BookTicketAction'
import calculateTicket from '@/lib/tickets/TicketCalculation'
import Ticket from '@/typings/Ticket'
import { twMerge } from 'tailwind-merge'
import { useAvailableStationBikesContext } from './AvailableStationBikes'
import TimeSelection from './TimeSelection'

export default function BookingCheckout() {
  const { selection, interval } = useAvailableStationBikesContext()

  const invoicePositions: Array<{ label: string; price: number }> = selection.map((pp) => {
    const { model } = pp.bike!
    return {
      label: `${model.category} ${model.name}`,
      price: calculateTicket(pp.bike!, interval.start, interval.end),
    }
  })

  const total = invoicePositions.reduce((prev, curr) => prev + curr.price, 0)

  const onBookTicket = () => {
    if (selection.filter((pp) => pp.bike?.model.category === 'Children').length === selection.length) {
      alert('Children tickets must always be combined with an adult ticket!')
      return
    }

    const ticket: Ticket = {
      interval,
      price: total,
      bikes: selection.map((pp) => pp.bike!),
    }

    BookTicketAction(ticket)
      .then(() => alert('Ticket booked!'))
      .catch(() => alert('Ticket could not be booked!'))
  }

  const PricingLine = ({ label, price, className }: { label: string; price: number; className?: string }) => (
    <div className={twMerge('flex items-center justify-between text-sm', className)}>
      <dt className='text-gray-700 dark:text-gray-200'>{label}</dt>
      <dd className='text-sm font-medium italic text-gray-700 dark:text-gray-400'>€{price}</dd>
    </div>
  )

  return (
    <div className='flex h-full min-w-[300px] flex-col justify-between border-l border-l-neutral-300 pl-4 dark:border-l-neutral-600'>
      <div className='flex flex-col gap-4'>
        <h2 className='text-xl font-semibold'>Checkout</h2>

        <dl className='space-y-2 px-2'>
          {invoicePositions.map((pos) => (
            <PricingLine key={pos.label} label={pos.label} price={pos.price} />
          ))}
        </dl>
      </div>

      <TimeSelection />

      <div className='flex flex-col gap-8 justify-self-end border-t border-dashed border-t-neutral-400 pt-6 dark:border-t-neutral-600'>
        <dl className='space-y-2 px-2'>
          <PricingLine label='Total:' price={total} className='text-base' />
        </dl>

        <button onClick={onBookTicket} className='text-md mx-auto rounded-md bg-blue-400/70 px-2 py-1 dark:bg-blue-600/70'>
          Book Ticket
        </button>
      </div>
    </div>
  )
}
