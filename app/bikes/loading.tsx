import { ObjectId, WithId } from 'mongodb'
import { Bike } from '@/typings/Bike'
import RenderBike from '@/app/(components)/bike/RenderBike'

export default async function LoadingBikes() {
  const bikes = Array.from({ length: 6 }).map(
    (e): WithId<Bike> => ({
      _id: new ObjectId(Math.random()).toString(),
      model: {
        // @ts-ignore
        _id: new ObjectId(Math.random()).toString(),
        name: '',
        reviews: [],
        description: '',
        category: 'City',
        manufacturer: '',
        wheel_size: 0,
        brakeType: 'Disc',
      },
    }),
  )

  return (
    <>
      <h1 className='mb-8 text-center text-3xl font-semibold lg:text-left'>Available Bikes</h1>
      <div className='grid grid-cols-1 gap-4 px-2 xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-3'>
        {bikes.map((b) => (
          <RenderBike key={Math.random().toString()} bike={b} bikeModels={[]} stations={[]} isPending />
        ))}
      </div>
    </>
  )
}
