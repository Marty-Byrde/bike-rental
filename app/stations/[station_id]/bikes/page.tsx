import { getStation } from '@/lib/station/StationDAO'
import { notFound } from 'next/navigation'
import RenderParkingPlaceTickets from '@/app/(components)/stations/book/RenderParkingPlaceTickets'

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
      <div className='flex gap-4'>{usedParkingPlaces?.map((up) => <RenderParkingPlaceTickets key={up.id} parkingPlace={up} />)}</div>
    </div>
  )
}
