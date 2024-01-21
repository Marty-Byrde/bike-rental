'use server'
import { revalidateTag } from 'next/cache'
import { ObjectId, WithId } from 'mongodb'
import Station from '@/typings/Station'
import { updateStation } from '@/lib/station/StationDAO'

export default async function UpdateStationAction(_id: ObjectId | string, updatedStation: WithId<Station>) {
  await updateStation(_id, updatedStation)
  revalidateTag('manage-stations')
}
