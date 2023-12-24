'use server'
import { revalidateTag } from 'next/cache'
import { ObjectId, WithId } from 'mongodb'
import { BikeModel } from '@/typings/Bike'
import { deleteBike } from '@/lib/bikes/BikesDAO'

export default async function DeleteBikeAction(bike: WithId<BikeModel>) {
  await deleteBike(new ObjectId(bike._id.toString()))
  revalidateTag('manage-bikes')
}
