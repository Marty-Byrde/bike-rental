'use client'
import { Bike, BikeModel } from '@/typings/Bike'
import { useState } from 'react'
import { WithId } from 'mongodb'
import useForm from '@/hooks/useForm'
import { DynamicText } from '@/app/(components)/Shared/Responsive/DynamicText'
import Rating from '@/app/(components)/Shared/Rating'
import structureClasses from '@/lib/Shared/structureClasses'
import UpdateBikeAction from '@/actions/bike/UpdateBikeAction'
import DeleteBikeAction from '@/actions/bike/DeleteBikeAction'
import { SelectComponent } from '@/app/(components)/Shared/Select'
import Station from '@/typings/Station'
import UpdateStationAction from '@/actions/stations/UpdateStationAction'

export default function RenderBike({
  bike: initialBike,
  isPending,
  editable,
  bikeModels,
  stations,
}: {
  bike: WithId<Bike>
  isPending?: boolean
  editable?: boolean
  bikeModels: WithId<BikeModel>[]
  stations: WithId<Station>[]
}) {
  const [bike, setBike] = useState<WithId<Bike>>(initialBike)
  const { onChange } = useForm(bike, setBike)

  return (
    <div className='rounded-lg bg-neutral-200/50 px-4 py-2 dark:bg-neutral-700/40'>
      <h2 className='flex gap-2 border-b-[2px] border-gray-400 pb-1 text-lg font-semibold dark:border-gray-500 2sm:mb-4'>
        <DynamicText isPending={isPending} content={bike._id.toString()} skHeight='h-4' skContainerClassName='py-1 flex-1' skBackground='bg-gray-300' className='flex-1 capitalize' />
        <Rating reviews={bike.model.reviews} isPending={isPending} />
      </h2>

      <div className={structureClasses('mb-2 flex flex-col gap-4 2sm:gap-2')}>
        <div className='flex flex-col gap-2 2sm:flex-row 2sm:items-center'>
          <DynamicText content='Bike Model:' isPending={isPending} skWidth='w-24' />
          <SelectComponent
            isPending={isPending}
            readOnly={!editable}
            className='flex-1'
            preSelected={[bike.model.name]}
            onSelect={(elements) =>
              setBike((bike) => {
                // @ts-ignore
                bike.model = bikeModels.find((bm) => bm.name === elements.at(0))
                return bike
              })
            }>
            <SelectComponent.Box className='text-md' placeHolder='Change the Bike-Model' />

            <SelectComponent.Modal>
              {bikeModels.map((bm) => (
                <SelectComponent.ModalOptions className='text-sm' key={bm._id.toString()} value={bm.name} />
              ))}
            </SelectComponent.Modal>
          </SelectComponent>
        </div>

        <div className='flex flex-col gap-2 2sm:flex-row 2sm:items-center'>
          <DynamicText content='Station:' isPending={isPending} skWidth='w-24' />
          <SelectComponent
            isPending={isPending}
            readOnly={!editable}
            className='flex-1'
            preSelected={[stations.find((s) => s.address.parkingPlaces.find((pc) => pc.bike?._id.toString() === bike._id.toString()))?.name ?? '']}
            onSelect={(elements, resetSelect) => {
              const selected = stations.find((s) => s.name === elements.at(0))!

              //? check whether parking places are free
              const freePlace = selected.address.parkingPlaces.find((p) => !p.bike && p.allowedCategories?.find((cat) => cat === bike.model.category))
              if (!freePlace) {
                resetSelect(true)
                alert('No free parking places that are equiped for the bikes-model-category...')
                return
              }

              //? remove bike from old station
              const oldStation = stations.find((s) => s.address.parkingPlaces.find((p) => p.bike?._id.toString() === bike._id.toString()))

              if (oldStation) {
                oldStation.address.parkingPlaces.forEach((p) => {
                  if (p.bike?._id !== bike._id) return

                  p.bike = undefined
                })

                console.log(`Removing bike from old station's parking place...`)
                UpdateStationAction(oldStation._id.toString(), oldStation)
              }

              //? Update selected stations parking places
              freePlace.bike = bike
              UpdateStationAction(selected._id.toString(), selected)
              console.log(`Updated selected station...`)
            }}>
            <SelectComponent.Box className='text-md' placeHolder='Select your Bikemodel-Category' />

            <SelectComponent.Modal>
              {stations.map((stat) => (
                <SelectComponent.ModalOptions className='text-sm' key={stat._id.toString()} value={stat.name} />
              ))}
            </SelectComponent.Modal>
          </SelectComponent>
        </div>
      </div>

      <form>
        <ActionButtons visible={editable} isPending={isPending} initialBike={initialBike} bike={bike} />
      </form>
    </div>
  )
}

function ActionButtons({ isPending, visible, initialBike, bike }: { isPending?: boolean; visible?: boolean; initialBike: WithId<Bike>; bike: WithId<Bike> }) {
  if (!visible) return null

  if (isPending) {
    return (
      <div className='mt-4 flex h-8 justify-end gap-2'>
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
    <div className='mt-4 flex justify-end gap-2'>
      <button className='rounded-md bg-blue-800/50 px-2 py-1 uppercase tracking-wide text-gray-100 dark:bg-blue-400/50 dark:text-gray-200' formAction={() => UpdateBikeAction(initialBike._id, bike)}>
        Update
      </button>
      <button className='rounded-md bg-red-800/50 px-2 py-1 uppercase tracking-wide text-gray-100 dark:bg-red-400/50 dark:text-gray-200' formAction={() => DeleteBikeAction(bike)}>
        Delete
      </button>
    </div>
  )
}
