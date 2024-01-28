import AvailableStationBikes from '@/app/(components)/stations/book/AvailableStationBikes'
import { getStation } from '@/lib/station/StationDAO'
import { ParkingPlace } from '@/typings/Bike'
import Ticket from '@/typings/Ticket'
import { notFound } from 'next/navigation'

interface SearchParams {
  params: {
    station_id: string
  }
}

export default async function StationBikesPage({ params: { station_id } }: SearchParams) {
  const station = await getStation(station_id)
  const tickets = await fetch(`${process.env.NEXTAUTH_URL}/api/tickets`).then((res) => res.json()).then(data => data as Ticket[])

  if (!station) notFound()

  const notYetRented = (parkingPlace: ParkingPlace) => !tickets.find(t => !!t.bikes.find(b => b._id.toString() === parkingPlace.bike!._id.toString()))
  const usedParkingPlaces = station.address.parkingPlaces?.filter((pp) => !!pp.bike && notYetRented(pp))

  if (!usedParkingPlaces || usedParkingPlaces.length === 0) {
    return (
      <div>
        <h1 className='mb-8 text-center text-3xl font-semibold lg:text-left'>Bikes of {station.name}</h1>
        <div className='text-lg'>No bikes are available at this station.</div>
      </div>
    )
  }

  return <AvailableStationBikes station={station} />
}
