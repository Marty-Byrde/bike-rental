import { ParkingPlace } from '@/typings/Bike'
import RenderSimpleBike from '../../tickets/RenderSimpleBike'
import { useAvailableStationBikesContext } from './AvailableStationBikes'

export default function DisplayBookingOption({ parkingPlace }: { parkingPlace: ParkingPlace }) {
  const { id, bike } = parkingPlace
  const { setSelection, isSelected } = useAvailableStationBikesContext()

  const handleSelection = () => {
    if (isSelected(parkingPlace)) {
      setSelection((prev) => prev.filter((pp) => pp.id !== parkingPlace.id))
    } else {
      setSelection((prev) => [...prev, parkingPlace])
    }
  }

  return (
    <div className='relative inset-1 flex flex-col gap-2 rounded-md bg-neutral-200 px-4 py-2 ring-1 ring-neutral-400 dark:bg-neutral-700/30 dark:ring-neutral-700'>
      <span className='absolute -right-0 -top-0 rounded-md bg-neutral-400/70 px-3 py-1 text-xs tracking-wider dark:bg-yellow-700/70'>P{id}</span>
      <RenderSimpleBike bike={bike!} heading='Bike Informations' ignoredModelProps={['_id', 'reviews']} />

      <button onClick={handleSelection} hidden={isSelected(parkingPlace)} className='text-md mt-2 rounded-md bg-blue-400/70 px-2 py-1 dark:bg-blue-600/70'>
        Add to Cart
      </button>

      <button onClick={handleSelection} hidden={!isSelected(parkingPlace)} className='text-md mt-2 rounded-md bg-red-400/70 px-2 py-1 dark:bg-red-600/70'>
        Remove from Cart
      </button>
    </div>
  )
}
