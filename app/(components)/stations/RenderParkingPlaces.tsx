import { BikeCategory, getDummyBikeCategories, ParkingPlace } from '@/typings/Bike'
import { useContext, useState } from 'react'
import structureClasses from '@/lib/Shared/structureClasses'
import { DynamicText } from '@/app/(components)/Shared/Responsive/DynamicText'
import { SelectComponent } from '@/app/(components)/Shared/Select'
import InputGroup from '@/app/(components)/Shared/Forms/InputGroup'
import { RenderStationContext } from '@/app/(components)/stations/RenderStation'

export default function RenderParkingPlaces() {
  const { station, isPending } = useContext(RenderStationContext)
  const parkingPlaces = station?.address?.parkingPlaces
  if (!parkingPlaces || parkingPlaces.length === 0) return null

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [shownPlace, setShowPlace] = useState<ParkingPlace>(parkingPlaces.at(0)!)

  return (
    <div className='mt-1 flex flex-col gap-2 border-t-2 pt-3 dark:border-neutral-600'>
      <div className='flex items-center gap-2'>
        <DynamicText content={`Parking Place:`} isPending={isPending} skWidth='w-24' className='text-md' />
        <SelectComponent
          isPending={isPending}
          readOnly={false} //? Must never be read-only so that users can switch between parking-places.
          onSelect={(elements) => {
            const selectedPlaceId = elements.length > 0 ? parseInt(elements.at(0)!.toString()) : -1
            if (!selectedPlaceId) return

            setShowPlace(parkingPlaces?.find((pp) => pp.id === selectedPlaceId)!)
          }}
          className='flex-1'
          preSelected={[parkingPlaces.at(0)!.id]}>
          <SelectComponent.Box dynamicTextClassName='text-md' placeHolder='View Parking Place' />

          <SelectComponent.Modal>
            {parkingPlaces.map((pc) => (
              <SelectComponent.ModalOptions className='text-sm' key={pc.id.toString() + 'parking-place-id'} value={pc.id} />
            ))}
          </SelectComponent.Modal>
        </SelectComponent>
      </div>

      {shownPlace && <RenderParkingPlace parkingPlace={shownPlace} />}
    </div>
  )
}

function RenderParkingPlace({ parkingPlace: { id, bike, allowedCategories } }: { parkingPlace: ParkingPlace }) {
  const { isPending, editable, setStation } = useContext(RenderStationContext)

  return (
    <div className={structureClasses('text-md mb-2 flex flex-col gap-4 2sm:gap-2')}>
      <div className='flex flex-col gap-2 2sm:flex-row 2sm:items-center'>
        <DynamicText content={`Allowed Categories`} className='text-md' isPending={isPending} skWidth='w-24' />
        <SelectComponent
          key={id}
          multiSelect
          isPending={isPending}
          readOnly={!editable}
          onSelect={(categories) => {
            const updatedCategories = categories as Array<BikeCategory['name']>

            setStation((prev) => {
              const places = prev.address.parkingPlaces.filter((pp) => pp.id !== id)
              places.push({
                id,
                allowedCategories: updatedCategories,
                bike,
              })

              prev.address.parkingPlaces = places
              return prev
            })
          }}
          className='flex-1'
          preSelected={allowedCategories}>
          <SelectComponent.Box dynamicTextClassName='text-md' placeHolder='Set allowed Bike-Categories' />

          <SelectComponent.Modal>
            {getDummyBikeCategories().map((cat) => (
              <SelectComponent.ModalOptions className='text-sm' key={cat.toString()} value={cat} />
            ))}
          </SelectComponent.Modal>
        </SelectComponent>
      </div>

      <InputGroup
        key={id}
        isPending={isPending}
        name='Has Bike'
        data-result='string'
        readOnly={true}
        className='flex-1 rounded-md px-2 py-1 focus:outline-none focus:ring-2 dark:bg-neutral-600/60 dark:text-gray-200 dark:focus:ring-blue-600/60'
        defaultValue={bike?._id ?? 'No'}
      />
    </div>
  )
}
