import { Db, MongoClient } from 'mongodb'

async function connect() {
  const { DATABASE_HOST, DATABASE_PORT, DATABASE_NAME, MONGODB_URI } = process.env
  if (!DATABASE_HOST || !DATABASE_PORT || !DATABASE_NAME || !MONGODB_URI) {
    throw new Error('Missing Database Variables!')
  }

  const client = new MongoClient(MONGODB_URI)
  await client.connect()
  return client.db(DATABASE_NAME)
}

let _instance: Db

async function getDB() {
  if (_instance !== undefined) return _instance

  const db = await connect()
  _instance = db
  return _instance
}

export async function getCollection(name: string) {
  const db = await getDB()
  return db.collection(name)
}
