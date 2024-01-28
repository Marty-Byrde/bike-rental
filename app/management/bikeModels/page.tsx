import RenderBikeModel from '@/app/(components)/bikeModel/RenderBikeModel'
import { BikeModel } from '@/typings/Bike'
import { WithId } from 'mongodb'

export default async function ManagementBikeModelsPage() {
  const bikes: WithId<BikeModel>[] = await fetch(`${process.env.NEXTAUTH_URL}/api/bikeModels`, { cache: 'no-cache', next: { tags: ['manage-bikeModels'] } }).then((res) => res.json())

  return (
    <>
      <h1 className='mb-8 text-center text-3xl font-semibold lg:text-left'>Manage Bike Models</h1>
      <div className='grid grid-cols-1 gap-4 px-2 xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-3'>
        {bikes.map((b) => (
          <RenderBikeModel key={b._id.toString()} bikeModel={b} editable />
        ))}
      </div>
    </>
  )
}
