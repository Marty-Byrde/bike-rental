import RenderBike from '@/app/(components)/bike/RenderBike'
import { Bike, BikeModel } from '@/typings/Bike'
import Station from '@/typings/Station'
import { WithId } from 'mongodb'

export default async function ManagementBikesPage() {
  const bikes: WithId<Bike>[] = await fetch(`${process.env.NEXTAUTH_URL}api/bikes`, { cache: 'no-cache', next: { tags: ['manage-bikes', 'manage-bikeModels'] } }).then((res) => res.json())
  const bikeModels: WithId<BikeModel>[] = await fetch(`${process.env.NEXTAUTH_URL}api/bikeModels`, { cache: 'no-cache', next: { tags: ['manage-bikeModels'] } }).then((res) => res.json())
  const stations: WithId<Station>[] = await fetch(`${process.env.NEXTAUTH_URL}/api/stations`, { cache: 'no-cache', next: { tags: ['manage-stations'] } }).then((res) => res.json())

  return (
    <>
      <h1 className='mb-8 text-center text-3xl font-semibold lg:text-left'>Manage Bikes</h1>
      <div className='grid grid-cols-1 gap-4 px-2 xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-3'>
        {bikes.map((b) => (
          <RenderBike key={b._id.toString()} bike={b} bikeModels={bikeModels} stations={stations} editable />
        ))}
      </div>
    </>
  )
}
