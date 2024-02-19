import { options } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession, User } from 'next-auth'
import { getCollection } from '@/lib/Shared/Database'
import { WithId } from 'mongodb'

export interface SessionData extends User {
  managementAccess?: boolean
  balance?: number
}

export default async function getSessionData() {
  const session = await getServerSession(options)
  if (!session || !session.user) return { user: null, data: null, getData: () => null, update: (param: any) => null }

  const user = session.user as User
  const collection = await getCollection('users')

  const findType = async <T>(filter: any) => (await collection.findOne(filter)) as T

  const getData = async () => await findType<WithId<SessionData>>({ ...user })
  const update = async (obj: Omit<SessionData, 'name' | 'email' | 'id' | 'image'>) => {
    return await collection.updateOne({ ...user }, { $set: obj })
  }

  const data = await getData()

  return { user, data, getData, update }
}
