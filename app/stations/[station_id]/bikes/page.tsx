import { getStation } from '@/lib/station/StationDAO'
import { notFound } from 'next/navigation'
import RenderBikeModel from '@/app/(components)/bikeModel/RenderBikeModel'

interface SearchParams {
  params: {
    station_id: string
  }
}

export default async function StationBikesPage({ params: { station_id } }: SearchParams) {
  const station = await getStation(station_id)
  if (!station) notFound()

  const usedParkingPlaces = station.address.parkingPlaces?.filter((pp) => !!pp.bike)
  if (!usedParkingPlaces || usedParkingPlaces.length === 0) {
    return (
      <div>
        <h1 className='mb-8 text-center text-3xl font-semibold lg:text-left'>Bikes of {station.name}</h1>
        <div className='text-lg'>No bikes are available at this station.</div>
      </div>
    )
  }

  return (
    <div>
      <h1 className='mb-8 text-center text-3xl font-semibold lg:text-left'>Bikes of {station.name}</h1>
      <div className='flex gap-4'>
        {usedParkingPlaces?.map((up) => (
          <div key={up.id} className='flex flex-col gap-2 rounded-md px-4 py-2 dark:bg-neutral-700/40'>
            <div className='flex flex-col gap-4 2sm:flex-row'>
              <span className='font-semibold text-gray-700 dark:text-gray-200'>Parked at:</span>
              <span>Parking-Place-{up.id}</span>
            </div>
            <div className='flex flex-col gap-4 2sm:flex-row'>
              <span className='font-semibold text-gray-700 dark:text-gray-200'>Model:</span>
              <RenderBikeModel bikeModel={up.bike!.model} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
