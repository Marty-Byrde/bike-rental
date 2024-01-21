'use server'
import { revalidateTag } from 'next/cache'
import { ObjectId, WithId } from 'mongodb'
import { Bike } from '@/typings/Bike'
import { deleteBike } from '@/lib/bikes/BikeDAO'

export default async function DeleteBikeAction(bike: WithId<Bike>) {
  await deleteBike(new ObjectId(bike._id.toString()))
  revalidateTag('manage-bikes')
}
