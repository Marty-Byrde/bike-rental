import Avatar from '@/app/(components)/Shared/Avatar'
import { SidebarProps } from '@/app/(components)/root/NavigationBar/SideBar'
import Link from "next/link"

export default function ProfileBanner({ user }: { user: SidebarProps['user'] }) {
  return (
    <Link href='/profile' className='group flex items-center gap-x-4 rounded-md px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/40'>
      <Avatar img={user?.image} width={256} height={256} className='h-8 w-8' />

      <span className='sr-only'>Your profile</span>
      <span className='group-hover:font-bold group-hover:text-indigo-600 dark:group-hover:text-blue-400' aria-hidden='true'>
        {user?.name}
      </span>
      <div className='flex flex-1 justify-end'>
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' strokeWidth={1.5} viewBox='0 0 24 24' stroke='currentColor' className='h-6 w-6 group-hover:stroke-2  dark:group-hover:stroke-blue-400'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z'
          />
          <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
        </svg>
      </div>
    </Link>
  )
}
