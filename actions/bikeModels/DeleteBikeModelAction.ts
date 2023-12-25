'use server'
import { revalidateTag } from 'next/cache'
import { ObjectId, WithId } from 'mongodb'
import { BikeModel } from '@/typings/Bike'
import { deleteBikeModel } from '@/lib/bikes/BikeModelsDAO'

export default async function DeleteBikeModelAction(bike: WithId<BikeModel>) {
  await deleteBikeModel(new ObjectId(bike._id.toString()))
  revalidateTag('manage-bikeModels')
}
