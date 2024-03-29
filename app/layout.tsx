import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SideBar from '@/app/(components)/root/NavigationBar/SideBar'
import structureClasses from '@/lib/Shared/structureClasses'
import { useColorModeValue } from '@/lib/Shared/ColorModeHandler'
import AuthProvider from '@/app/(components)/root/AuthProvider'
import CookieBanner from '@/app/(components)/Shared/CookieBanner'
import { cookies } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bike Rental App',
  description: 'View, Rent, Manage and Book S',
}

const ColorSettings = {
  lightBackground: 'bg-neutral-100',
  raw_darkBackground: 'bg-neutral-800',
  darkBackground: 'dark:bg-neutral-800',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { lightBackground, darkBackground, raw_darkBackground } = ColorSettings
  const cookiePermission = !!cookies().get('essentialCookies')

  return (
    <html lang='en' className={structureClasses(useColorModeValue(lightBackground, `dark ${raw_darkBackground}`), '')}>
      <body className={inter.className}>
        <AuthProvider>
          <SideBar />

          <div className={structureClasses('px-4 py-4 text-gray-700 dark:text-gray-200 lg:ml-72', lightBackground, darkBackground)}>{children}</div>

          <CookieBanner permission={cookiePermission} />
        </AuthProvider>
      </body>
    </html>
  )
}
