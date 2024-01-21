import Link from 'next/link'
import { ArrowRightIcon, UserIcon } from '@heroicons/react/24/outline'
import getSessionData from '@/lib/Shared/getSessionData'
import Settings6ToothIcon from '@/svgs/outline/Settings6ToothIcon'
import Image from 'next/image'

export default async function ProfileBanner() {
  const { user } = await getSessionData()

  return user ? (
    <Banner
      href='/profile'
      text={user.name!}
      LeftIcon={<Image src={user.image ?? ''} width={256} height={256} alt={user.name + 'icon'} className='h-7 w-7 rounded-full' />}
      RightIcon={<Settings6ToothIcon className='h-6 w-6 group-hover:stroke-2 dark:group-hover:stroke-blue-400' />}
    />
  ) : (
    <Banner
      href='/api/auth/signin'
      text='Sign in'
      LeftIcon={<UserIcon className='h-6 w-6 group-hover:stroke-2 dark:group-hover:stroke-blue-400' />}
      RightIcon={<ArrowRightIcon className='h-6 w-6 group-hover:stroke-2 dark:group-hover:stroke-blue-400' />}
    />
  )
}

interface BannerProps {
  href: string
  LeftIcon?: React.JSX.Element
  RightIcon?: React.JSX.Element
  text: string
  srText?: string
}

function Banner({ href, text, LeftIcon, RightIcon, srText }: BannerProps) {
  return (
    <Link href={href} className='text-md group flex items-center gap-x-4 rounded-md px-6 py-3 font-semibold leading-6 text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/40'>
      {LeftIcon ?? null}

      <span className='sr-only'>{srText ?? text}</span>
      <span className='group-hover:font-bold group-hover:text-indigo-600 dark:group-hover:text-blue-400' aria-hidden='true'>
        {text}
      </span>

      {RightIcon && <div className='flex flex-1 justify-end'>{RightIcon}</div>}
    </Link>
  )
}
