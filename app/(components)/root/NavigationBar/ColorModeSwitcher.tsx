'use client'
import { parseCookies, setCookie } from 'nookies'
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'
import { GlobalColorSettings } from '@/lib/root/ColorSettings'

function updateColorMode(mode: 'dark' | 'light', cookiesAllowed: boolean) {
  document.documentElement.classList.toggle('dark')
  document.documentElement.classList.toggle(GlobalColorSettings.lightBackground) //? change document background-color
  document.documentElement.classList.toggle(GlobalColorSettings.raw_darkBackground) //? change document background-color

  if (cookiesAllowed) updateCookies(mode)
  else console.log('Essential cookies are denied, color-mode prefence has not been saved!')
}

function updateCookies(mode: 'dark' | 'light') {
  setCookie(null, 'colorMode', mode, {
    maxAge: 24 * 60 * 60 * 300, // 300 days
    path: '/',
    secure: false,
    sameSite: true,
  })
}

export default function ColorModeSwitcher({ className }: { className?: string }) {
  const [mode, setMode] = useState<'light' | 'dark' | undefined>()
  const cookiePermission = () => !!parseCookies()?.essentialCookies

  const handleToggle = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'

    setMode(newMode)
    updateColorMode(newMode, cookiePermission())
  }

  useEffect(() => {
    const preference = (parseCookies()?.colorMode ?? (window?.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) as 'light' | 'dark'

    setMode(preference) //? Set the initial color-preference
    if (!parseCookies()?.colorMode) updateColorMode(preference, cookiePermission())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={twMerge('h-6 w-6 hover:cursor-pointer', className)}>
      <Transition show={mode === 'light'} enter='transition duration-300' enterFrom='rotate-45 opacity-50' enterTo='rotate-0 opacity-100'>
        {mode === 'light' && <SunIcon onClick={handleToggle} />}
      </Transition>

      <Transition show={mode === 'dark'} enter='transition duration-300' enterFrom='-rotate-45 opacity-50' enterTo='rotate-45 opacity-100'>
        {mode === 'dark' && <MoonIcon onClick={handleToggle} />}
      </Transition>
    </div>
  )
}
