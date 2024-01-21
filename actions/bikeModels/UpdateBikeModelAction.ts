'use server'
import { revalidateTag } from 'next/cache'
import { ObjectId, WithId } from 'mongodb'
import { BikeModel } from '@/typings/Bike'
import { updateBikeModel } from '@/lib/bikes/BikeModelsDAO'

export default async function UpdateBikeModelAction(_id: ObjectId | string, model: WithId<BikeModel>) {
  await updateBikeModel(_id, model)
  revalidateTag('manage-bikeModels')
}
