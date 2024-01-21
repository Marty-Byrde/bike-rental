import { ObjectId, WithId } from 'mongodb'
import Station from '@/typings/Station'
import RenderStation from '@/app/(components)/stations/RenderStation'

export default async function LoadingStations() {
  const stations = Array.from({ length: 6 }).map(
    (e): WithId<Station> => ({
      // @ts-ignore
      _id: new ObjectId(Math.random()).toString(),
      name: 'somename',
      address: {
        city: '',
        parkingPlaces: [],
        coordinates: [],
      },
      reviews: [],
    }),
  )

  return (
    <>
      <h1 className='mb-8 text-center text-3xl font-semibold lg:text-left'>Available Stations</h1>
      <div className='grid grid-cols-1 gap-4 px-2 xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-3'>
        {stations.map((s) => (
          <RenderStation key={Math.random().toString()} station={s} isPending />
        ))}
      </div>
    </>
  )
}
