import { ObjectId, WithId } from 'mongodb'
import { BikeModel } from '@/typings/Bike'
import RenderBikeModel from '@/app/(components)/bikeModel/RenderBikeModel'

export default async function LoadingManagementBikeModels() {
  const bikes = Array.from({ length: 6 }).map(
    (e): WithId<BikeModel> => ({
      // @ts-ignore
      _id: new ObjectId(Math.random()).toString(),
      name: 'something',
      brakeType: 'Disc',
      description: '',
      wheel_size: 0,
      manufacturer: '',
      id: 0,
      category: 'City',
      reviews: [],
    }),
  )

  return (
    <>
      <h1 className='mb-8 text-center text-3xl font-semibold lg:text-left'>Available Bikes</h1>
      <div className='grid grid-cols-1 gap-4 px-2 xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-3'>
        {bikes.map((b) => (
          <RenderBikeModel key={Math.random().toString()} bikeModel={b} isPending editable />
        ))}
      </div>
    </>
  )
}
