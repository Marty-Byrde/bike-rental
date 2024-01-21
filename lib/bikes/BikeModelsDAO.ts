import { getCollection } from '@/lib/Shared/Database'
import { ObjectId, WithId } from 'mongodb'
import { BikeModel } from '@/typings/Bike'

const { COLLECTION_BIKEMODELS } = process.env
if (!COLLECTION_BIKEMODELS) throw new Error('Missing BikeModel Collection Name, check .env variables.')

export async function createBikeModel(bike: BikeModel) {
  const collection = await getCollection(COLLECTION_BIKEMODELS!)

  const exists = await collection.findOne({ ...bike })
  if (exists) return console.log(`BikeModel has not been added, because it already exists... _id: ${exists._id.toString()}`)

  await collection.insertOne({
    ...bike,
  })
}

export async function getBikeModels() {
  const collection = await getCollection(COLLECTION_BIKEMODELS!)
  const models = await collection.find({}).toArray()

  return models as WithId<BikeModel>[]
}

export async function deleteBikeModel(id: ObjectId) {
  const collection = await getCollection(COLLECTION_BIKEMODELS!)
  await collection.deleteOne({ _id: id })
}

export async function updateBikeModel(id: string | ObjectId, update: WithId<BikeModel> | BikeModel) {
  // @ts-ignore
  if (update?._id) delete update._id

  const collection = await getCollection(COLLECTION_BIKEMODELS!)
  await collection.updateOne({ _id: new ObjectId(id.toString()) }, { $set: update })
}
