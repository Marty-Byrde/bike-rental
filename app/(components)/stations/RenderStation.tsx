'use client'
import { WithId } from 'mongodb'
import Station from '@/typings/Station'
import { createContext, useContext, useState } from 'react'
import structureClasses from '@/lib/Shared/structureClasses'
import DeleteStationAction from '@/actions/stations/DeleteStationAction'
import InputGroup from '@/app/(components)/Shared/Forms/InputGroup'
import useForm from '@/hooks/useForm'
import UpdateStationAction from '@/actions/stations/UpdateStationAction'
import { DynamicText } from '@/app/(components)/Shared/Responsive/DynamicText'
import Rating from '@/app/(components)/Shared/Rating'
import ReactState from '@/typings/ReactState'
import RenderParkingPlaces from '@/app/(components)/stations/RenderParkingPlaces'
import Link from 'next/link'

interface RenderStationContextProps {
  initialStation: WithId<Station>
  station: ReactState<WithId<Station>>['state']
  setStation: ReactState<WithId<Station>>['setState']
  editable: boolean
  isPending: boolean
}

// @ts-ignore
const defaultContext: RenderStationContextProps = {}

export const RenderStationContext = createContext(defaultContext)

export default function RenderStation({ station: initialStation, editable, isPending }: { station: WithId<Station>; editable?: boolean; isPending?: boolean }) {
  const [station, setStation] = useState<WithId<Station>>(initialStation)
  const { onChange } = useForm(station, setStation)

  return (
    <RenderStationContext.Provider value={{ initialStation, station, setStation, editable: editable ?? false, isPending: isPending ?? false }}>
      <div className='rounded-lg bg-neutral-200/50 px-4 py-2 dark:bg-neutral-700/40'>
        <h2 className='flex gap-2 border-b-[2px] border-gray-400 pb-1 text-lg font-semibold dark:border-gray-500 2sm:mb-4'>
          <DynamicText isPending={isPending} content={station.name} skHeight='h-4' skContainerClassName='py-1 flex-1' skBackground='bg-gray-300' className='flex-1' />
          <Rating reviews={station.reviews} isPending={isPending} />
        </h2>

        <div className={structureClasses('text-md mb-2 flex flex-col gap-4 2sm:gap-2')}>
          <InputGroup name='_id' hidden className='flex-1 rounded-md px-2 py-1 dark:bg-neutral-600/60 dark:text-gray-200' defaultValue={station._id.toString()} readOnly />
          <InputGroup
            isPending={isPending}
            name='name'
            onChange={onChange}
            readOnly={!editable}
            className='flex-1 rounded-md px-2 py-1 dark:bg-neutral-600/60 dark:text-gray-200'
            defaultValue={station.name}
          />
          <InputGroup
            isPending={isPending}
            name='city'
            data-path={['address']}
            data-result='a'
            onChange={onChange}
            readOnly={!editable}
            className='flex-1 rounded-md px-2 py-1 dark:bg-neutral-600/60 dark:text-gray-200'
            defaultValue={station.address.city}
          />
          <InputGroup
            isPending={isPending}
            name='coordinates'
            data-path={['address']}
            data-result='array<number>'
            onChange={onChange}
            readOnly={!editable}
            className='flex-1 rounded-md px-2 py-1 dark:bg-neutral-600/60 dark:text-gray-200'
            defaultValue={station.address.coordinates.join(', ')}
          />

          <RenderParkingPlaces />
        </div>

        <form className='flex justify-end gap-2 '>
          <RegularActionButtons />
          <ManagementActionButtons />
        </form>
      </div>
    </RenderStationContext.Provider>
  )
}

function RegularActionButtons() {
  const { station, isPending } = useContext(RenderStationContext)

  if (isPending) {
    return (
      <div className='flex h-8 w-[120px] items-center justify-center gap-2 rounded-md bg-gray-800/50 px-2 py-1 capitalize tracking-wide text-gray-100 dark:bg-gray-400/50 dark:text-gray-200'>
        <DynamicText content='' skeletonClassName='flex-1 dark:bg-gray-400' skWidth='w-24' isPending />
      </div>
    )
  }

  return (
    <div className='flex justify-end gap-2'>
      <Link href={`/stations/${station._id.toString()}/bikes`} className='rounded-md bg-gray-800/50 px-2 py-1 capitalize tracking-wide text-gray-100 dark:bg-gray-400/50 dark:text-gray-200'>
        Check Available Bikes
      </Link>
    </div>
  )
}

function ManagementActionButtons() {
  const { initialStation, station, isPending, editable: visible } = useContext(RenderStationContext)

  if (!visible) return null

  if (isPending) {
    return (
      <div className='flex h-8 justify-end gap-2'>
        <div className='flex w-[80px] items-center justify-center rounded-md bg-blue-800/50 px-2 py-1 uppercase tracking-wide text-gray-100 dark:bg-blue-400/50 dark:text-gray-200'>
          <DynamicText content='' skeletonClassName='flex-1 dark:bg-gray-400' skWidth='w-14' isPending />
        </div>

        <div className='flex w-[80px] items-center justify-center rounded-md bg-red-800/50 px-2 py-1 uppercase tracking-wide text-gray-100 dark:bg-red-400/50 dark:text-gray-200'>
          <DynamicText content='' skeletonClassName='flex-1 dark:bg-gray-400' skWidth='w-14' isPending />
        </div>
      </div>
    )
  }

  return (
    <div className='flex justify-end gap-2'>
      <button
        className='rounded-md bg-blue-800/50 px-2 py-1 uppercase tracking-wide text-gray-100 dark:bg-blue-400/50 dark:text-gray-200'
        formAction={() => UpdateStationAction(initialStation._id, station)}>
        Update
      </button>
      <button className='rounded-md bg-red-800/50 px-2 py-1 uppercase tracking-wide text-gray-100 dark:bg-red-400/50 dark:text-gray-200' formAction={() => DeleteStationAction(station)}>
        Delete
      </button>
    </div>
  )
}
