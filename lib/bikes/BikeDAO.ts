import { getCollection } from '@/lib/Shared/Database'
import { ObjectId, WithId } from 'mongodb'
import { Bike, BikeModel } from '@/typings/Bike'

const { COLLECTION_BIKES, COLLECTION_BIKEMODELS } = process.env
if (!COLLECTION_BIKES) throw new Error('Missing Bike Collection Name, check .env variables.')
if (!COLLECTION_BIKEMODELS) throw new Error('Missing BikeModel Collection Name, check .env variables.')

export async function createBike(bike: Bike) {
  const collection = await getCollection(COLLECTION_BIKES!)

  const exists = await collection.findOne({ _id: new ObjectId(bike._id.toString()) })
  if (exists) return console.log(`Bike has not been added, because it already exists... _id: ${exists._id.toString()}`)

  await collection.insertOne({
    model: bike.model,
  })
}

export async function getBikes() {
  const collection = await getCollection(COLLECTION_BIKES!)
  const modelsCollection = await getCollection(COLLECTION_BIKEMODELS!)
  const bikes = (await collection.find({}).toArray()) as unknown as WithId<Bike>[]

  for (let bike of bikes) {
    const model = (await modelsCollection.findOne({ _id: new ObjectId(bike.model._id.toString()) })) as WithId<BikeModel>
    bike.model = model
  }

  return bikes
}

export async function deleteBike(id: ObjectId) {
  const collection = await getCollection(COLLECTION_BIKES!)
  await collection.deleteOne({ _id: id })
}

export async function updateBike(id: string | ObjectId, update: WithId<Bike> | Bike) {
  // @ts-ignore
  if (update?._id) delete update._id

  const collection = await getCollection(COLLECTION_BIKES!)
  await collection.updateOne({ _id: new ObjectId(id.toString()) }, { $set: update })
}
