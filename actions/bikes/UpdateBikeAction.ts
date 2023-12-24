'use server'
import { revalidateTag } from 'next/cache'
import { ObjectId, WithId } from 'mongodb'
import { BikeModel } from '@/typings/Bike'
import { updateBike } from '@/lib/bikes/BikesDAO'

export default async function UpdateBikeAction(_id: ObjectId | string, bike: WithId<BikeModel>) {
  await updateBike(_id, bike)
  revalidateTag('manage-bikes')
}
