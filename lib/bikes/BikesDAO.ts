import { getCollection } from '@/lib/Shared/Database'
import { ObjectId, WithId } from 'mongodb'
import BikeModel from '@/typings/Bike'

const { COLLECTION_BIKES } = process.env
if (!COLLECTION_BIKES) throw new Error('Missing Bike Collection Name, check .env variables.')

export async function createBike(bike: BikeModel) {
  const collection = await getCollection(COLLECTION_BIKES!)

  const exists = await collection.findOne({ ...bike })
  if (exists) return console.log(`Bike has not been added, because it already exists... _id: ${exists._id.toString()}`)

  await collection.insertOne({
    ...bike,
  })
}

export async function getBikes() {
  const collection = await getCollection(COLLECTION_BIKES!)
  const bikes = await collection.find({}).toArray()

  return bikes as WithId<BikeModel>[]
}

export async function deleteBike(id: ObjectId) {
  const collection = await getCollection(COLLECTION_BIKES!)
  await collection.deleteOne({ _id: id })
}

export async function updateBike(id: string | ObjectId, update: WithId<BikeModel> | BikeModel) {
  // @ts-ignore
  if (update?._id) delete update._id

  const collection = await getCollection(COLLECTION_BIKES!)
  await collection.updateOne({ _id: new ObjectId(id.toString()) }, { $set: update })
}
