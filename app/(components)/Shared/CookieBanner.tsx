'use client'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { twMerge } from 'tailwind-merge'
import { useEffect, useState } from 'react'

export default function CookieBanner({ permission }: { permission: boolean }) {
  const [acceptance, setAcceptance] = useState<'yes' | 'no' | undefined>()

  useEffect(() => {
    if (acceptance === 'no') {
      //? remove all cookies
      const allCookies = parseCookies()
      Object.keys(allCookies).forEach((cookie) => destroyCookie(null, cookie))
      console.log('Successfully rejected our cookies.')
      if (Object.keys(allCookies).length > 0) console.log('Successfully removed all cookies that were previously stored!')
      return
    }

    if (acceptance === 'yes') {
      setCookie(null, 'essentialCookies', 'accepted', {
        maxAge: 24 * 60 * 60 * 300, // 300 days
        path: '/',
        secure: false,
        sameSite: true,
      })
      return
    }

    if (permission) setAcceptance('yes')
  }, [acceptance])

  return (
    <div
      className={twMerge(
        'fixed inset-x-0 bottom-0 z-50 flex flex-col justify-between gap-x-8 gap-y-4 bg-white p-6 ring-1 ring-gray-900/10 dark:bg-black md:left-72 md:flex-row md:items-center lg:px-8',
        acceptance !== undefined ? 'hidden' : '',
        permission && 'hidden',
      )}>
      <p className='max-w-5xl text-sm leading-6 text-gray-900 dark:text-white '>
        This website uses cookies to save your color-mode preference. Accepting our cookies is optional but recommended, as they are delicious.
      </p>

      <div className='flex flex-none items-center gap-x-5'>
        <button
          type='button'
          onClick={() => setAcceptance('yes')}
          className='rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:bg-blue-600 dark:text-white'>
          Accept
        </button>

        <button type='button' onClick={() => setAcceptance('no')} className='text-sm font-semibold leading-6 text-gray-400 dark:text-gray-500'>
          Reject
        </button>
      </div>
    </div>
  )
}
