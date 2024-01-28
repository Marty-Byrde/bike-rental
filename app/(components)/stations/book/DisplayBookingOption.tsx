import { ParkingPlace } from "@/typings/Bike"
import RenderSimpleBike from "../../tickets/RenderSimpleBike"
import { useAvailableStationBikesContext } from "./AvailableStationBikes"

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
    <div className='relative flex flex-col gap-2 px-4 py-2 dark:bg-neutral-700/30 ring-1 dark:ring-neutral-700 rounded-md'>
      <span className='absolute -top-0 -right-0 rounded-md dark:bg-yellow-700/70 text-xs px-3 py-1 tracking-wider'>P{id}</span>
      <RenderSimpleBike bike={bike!} heading="Bike Informations" ignoredModelProps={['_id', 'reviews']} />

      <button onClick={handleSelection} hidden={isSelected(parkingPlace)} className='mt-2 px-2 rounded-md text-md py-1 dark:bg-blue-600/70'>
        Add to Cart
      </button>

      <button onClick={handleSelection} hidden={!isSelected(parkingPlace)} className='mt-2 px-2 rounded-md text-md py-1 dark:bg-red-600/70'>
        Remove from Cart
      </button>
    </div>
  )
}