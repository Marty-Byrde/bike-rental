import AnimatedLandingPage from '@/app/(components)/root/AnimatedLandingPage'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <div className='mb-8 flex flex-col gap-1 '>
        <h1 className='text-center text-3xl font-semibold lg:text-left'>Bike-Rental Services</h1>
        <p className='text-center text-gray-500 dark:text-gray-400 lg:text-left'>Rent various bike-models from various stations</p>
      </div>
      <div className='mt-48'>
        <AnimatedLandingPage />
      </div>

      <div className='absolute bottom-1/4 left-0 right-0 flex justify-center lg:left-72'>
        <Link href='/stations' className='rounded-md bg-blue-400/40 px-4 py-2'>
          Lets Get Started
        </Link>
      </div>
    </div>
  )
}
