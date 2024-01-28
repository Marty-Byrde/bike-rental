import { getCollection } from '@/lib/Shared/Database'
import Ticket from '@/typings/Ticket'
import { ObjectId, WithId } from 'mongodb'

const { COLLECTION_TICKETS } = process.env
if (!COLLECTION_TICKETS) throw new Error('Missing Ticket Collection Name, check .env variables.')

export async function createTicket(Ticket: Ticket) {
  const collection = await getCollection(COLLECTION_TICKETS!)

  const exists = await collection.findOne({ ...Ticket })
  if (exists) return console.log(`Ticket has not been added, because it already exists... _id: ${exists._id.toString()}`)

  await collection.insertOne({
    ...Ticket,
  })
}

export async function getTickets() {
  const collection = await getCollection(COLLECTION_TICKETS!)
  const Tickets = await collection.find({}).toArray()

  return Tickets as WithId<Ticket>[]
}

export async function deleteTicket(id: ObjectId) {
  const collection = await getCollection(COLLECTION_TICKETS!)
  await collection.deleteOne({ _id: id })
}

export async function updateTicket(id: string | ObjectId, update: WithId<Ticket> | Ticket) {
  // @ts-ignore
  if (update?._id) delete update._id

  const collection = await getCollection(COLLECTION_TICKETS!)
  await collection.updateOne({ _id: new ObjectId(id.toString()) }, { $set: update })
}

export async function getTicket(id: string) {
  const collection = await getCollection(COLLECTION_TICKETS!)
  const Ticket = (await collection.findOne({ _id: new ObjectId(id) })) as WithId<Ticket> | null
  return Ticket
}
