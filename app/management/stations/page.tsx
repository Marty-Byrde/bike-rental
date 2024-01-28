import RenderStation from '@/app/(components)/stations/RenderStation'
import Station from '@/typings/Station'
import { WithId } from 'mongodb'

export default async function ManagementStationsPage() {
  const stations: WithId<Station>[] = await fetch(`${process.env.NEXTAUTH_URL}/api/stations`, { cache: 'no-cache', next: { tags: ['manage-stations'] } }).then((res) => res.json())

  return (
    <>
      <h1 className='mb-8 text-center text-3xl font-semibold lg:text-left'>Manage Stations</h1>
      <div className='grid grid-cols-1 gap-4 px-2 xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-3'>
        {stations.map((s) => (
          <RenderStation key={s._id.toString()} station={s} editable />
        ))}
      </div>
    </>
  )
}
