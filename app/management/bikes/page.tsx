import { WithId } from 'mongodb'
import { BikeModel } from '@/typings/Bike'
import RenderBike from '@/app/(components)/bikes/RenderBike'

export default async function ManagementBikesPage() {
  const bikes: WithId<BikeModel>[] = await fetch('http://localhost/api/bikes', { cache: 'no-cache', next: { tags: ['manage-bikes'] } }).then((res) => res.json())

  return (
    <>
      <h1 className='mb-8 text-center text-3xl font-semibold lg:text-left'>Manage Bike Models</h1>
      <div className='grid grid-cols-1 gap-4 px-2 xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-3'>
        {bikes.map((b) => (
          <RenderBike key={b._id.toString()} bike={b} editable />
        ))}
      </div>
    </>
  )
}
