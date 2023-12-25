'use server'
import { revalidateTag } from 'next/cache'
import { ObjectId, WithId } from 'mongodb'
import { Bike } from '@/typings/Bike'
import { updateBike } from '@/lib/bikes/BikeDAO'

export default async function UpdateBikeAction(_id: ObjectId | string, bike: WithId<Bike>) {
  await updateBike(_id, bike)
  revalidateTag('manage-bikes')
}
