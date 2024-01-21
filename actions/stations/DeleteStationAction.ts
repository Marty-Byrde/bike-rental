'use server'
import { revalidateTag } from 'next/cache'
import { deleteStation } from '@/lib/station/StationDAO'
import { ObjectId, WithId } from 'mongodb'
import Station from '@/typings/Station'

export default async function DeleteStationAction(station: WithId<Station>) {
  await deleteStation(new ObjectId(station._id.toString()))
  revalidateTag('manage-stations')
}
