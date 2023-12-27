'use client'
import { ParkingPlace } from '@/typings/Bike'
import { useEffect, useState } from 'react'
import Ticket from '@/typings/Ticket'
import RenderBikeModel from '@/app/(components)/bikeModel/RenderBikeModel'
import createTicket from '@/lib/tickets/TicketCalculation'

export default function RenderParkingPlaceTickets({ parkingPlace }: { parkingPlace: ParkingPlace }) {
  const defaultStart = new Date(Date.now())
  const defaultEnd = new Date(Date.now())
  defaultEnd.setHours(defaultEnd.getHours() + 1)

  const [interval, setInterval] = useState<Ticket['interval']>({ start: defaultStart, end: defaultEnd })
  const [ticket, setTicket] = useState<Ticket | undefined>(undefined)

  useEffect(() => {
    if (!interval) return setTicket(undefined)
    if (!interval.start || !interval.end) return setTicket(undefined)

    const ticket = createTicket(parkingPlace.bike!, interval.start, interval.end)
    setTicket(ticket)
  }, [interval])

  return (
    <div className='flex flex-col gap-2 rounded-md bg-neutral-200 px-4 py-2 dark:bg-neutral-700/40'>
      <div className='flex flex-col gap-4 2sm:flex-row'>
        <span className='font-semibold text-gray-700 dark:text-gray-200'>Parked at:</span>
        <span>Parking-Place-{parkingPlace.id}</span>
      </div>
      <div className='flex flex-col gap-4 2sm:flex-row'>
        <span className='font-semibold text-gray-700 dark:text-gray-200'>Model:</span>
        <RenderBikeModel bikeModel={parkingPlace.bike!.model} />
      </div>
      <div className='mt-1 border-t border-dashed border-gray-700 pt-2 dark:border-gray-400'>
        <span className='text-md font-semibold'>Ticket Pricing</span>
        <div className='my-2 flex flex-col gap-2 md:flex-row'>
          <div className='flex break-inside-avoid-column items-center gap-2'>
            <span>Start:</span>
            <input
              onChange={(e) =>
                setInterval((prev) => {
                  if (!e.target.valueAsDate) return prev

                  return { ...prev, start: e.target.valueAsDate }
                })
              }
              type='datetime-local'
              defaultValue={defaultStart.toISOString().split('.').at(0)}
              className='px-1 py-0.5 text-sm focus:outline-none dark:bg-neutral-600/60'
            />
          </div>

          <div className='flex break-inside-avoid-column items-center gap-2'>
            <span>End:</span>
            <input
              onChange={(e) =>
                setInterval((prev) => {
                  if (!e.target.valueAsDate) return prev

                  return { ...prev, start: e.target.valueAsDate }
                })
              }
              type='datetime-local'
              defaultValue={defaultEnd.toISOString().split('.').at(0)}
              className='px-1 py-0.5 text-sm focus:outline-none dark:bg-neutral-600/60'
            />
          </div>
        </div>
        {ticket && (
          <form className='flex justify-between'>
            <div className='flex gap-2'>
              <span className='font-semibold'>Trip Costs:</span>
              <span>{ticket.price}€</span>
            </div>

            <button formAction={() => {}} className='mt-4 rounded-md bg-blue-800/50 px-2 py-1 uppercase tracking-wide text-gray-100 dark:bg-blue-400/50 dark:text-gray-200'>
              Book Ticket
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
