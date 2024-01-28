import { BikeModel, ParkingPlace } from "@/typings/Bike"
import { WithId } from "mongodb"
import { useAvailableStationBikesContext } from "./AvailableStationBikes"

export default function DisplayBookingOption({ parkingPlace }: { parkingPlace: ParkingPlace }) {
  const { id, bike } = parkingPlace
  const { setSelection, isSelected } = useAvailableStationBikesContext()

  const RenderProperty = ({ propertyKey }: { propertyKey: keyof WithId<BikeModel> }) => {
    if (propertyKey === 'reviews') return null
    if (propertyKey === '_id') return null

    return (
      <div className='flex flex-col gap-2 2sm:flex-row 2sm:items-center text-sm'>
        <span className=''>{propertyKey}:</span>
        <span className='italic'>{bike!.model[propertyKey]}</span>
      </div>
    )
  }

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
      <div className='flex flex-col gap-2 mt-2'>
        <h2 className='text-lg font-semibold'>Bike Informations</h2>
        {Object.keys(bike!.model).map((key) => <RenderProperty key={key} propertyKey={key as keyof WithId<BikeModel>} />)}
      </div>

      <button onClick={handleSelection} hidden={isSelected(parkingPlace)} className='mt-2 px-2 rounded-md text-md py-1 dark:bg-blue-600/70'>
        Add to Cart
      </button>

      <button onClick={handleSelection} hidden={!isSelected(parkingPlace)} className='mt-2 px-2 rounded-md text-md py-1 dark:bg-red-600/70'>
        Remove from Cart
      </button>
    </div>
  )
}