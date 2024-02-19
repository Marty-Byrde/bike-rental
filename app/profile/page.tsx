import getSessionData from '@/lib/Shared/getSessionData'
import { notFound } from 'next/navigation'
import Image from 'next/image'

export default async function ProfilePage() {
  const { user, data } = await getSessionData()
  if (!user) return notFound()

  return (
    <form action='/api/auth/signout'>
      <h1 className='mb-8 text-center text-3xl font-semibold lg:text-left'>Profile Settings</h1>
      <div className='mt-12 flex flex-col items-center gap-4'>
        <Image src={user.image!} alt='User-Avatar' width={128} height={128} className='rounded-full' />
        <div className='flex flex-col'>
          <span className='text-lg font-semibold'>{user.name}</span>
          <span className='text-gray-500 dark:text-gray-400'>{user.email}</span>
        </div>
      </div>

      <div className='mt-8 flex flex-col items-center'>
        <span className='text-lg font-semibold'>Current Balance:</span>
        <span>{data?.balance ?? 0} €</span>
      </div>

      <div className='absolute bottom-24 left-0 right-0 flex justify-center lg:bottom-1/4 lg:left-72'>
        <button className='rounded-md px-4 py-2 dark:bg-blue-500 dark:hover:bg-blue-500/80 dark:active:bg-blue-500/60'>Sign Out</button>
      </div>
    </form>
  )
}
