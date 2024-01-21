'use client'

import { createContext, Fragment, useContext, useState } from 'react'
import ReactState from '@/typings/ReactState'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'
import ColorModeSwitcher from '@/app/(components)/root/NavigationBar/ColorModeSwitcher'

const MobilebarComponentContext = createContext({})

export default function MobilebarComponent({ children }: { children: React.JSX.Element | React.JSX.Element[] }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <MobilebarComponentContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      <MobilebarComponent.Header>
        <MobilebarComponent.CloseButton />
        <div className='flex-1 text-center text-lg font-semibold leading-6 text-gray-700 dark:text-gray-200'>Bike Rental</div>
        <ColorModeSwitcher className='text-gray-700 dark:text-gray-200' />
      </MobilebarComponent.Header>

      <MobilebarComponent.Dialog>{children}</MobilebarComponent.Dialog>
    </MobilebarComponentContext.Provider>
  )
}

// eslint-disable-next-line react/display-name
MobilebarComponent.Header = ({ children }: { children: React.JSX.Element | React.JSX.Element[] }) => (
  <div className='sticky top-0 z-40 flex select-text items-center gap-x-6 bg-white px-4 py-4 shadow-sm dark:bg-neutral-800 sm:px-6 lg:hidden'>{children}</div>
)

// eslint-disable-next-line react/display-name
MobilebarComponent.CloseButton = () => {
  // @ts-ignore
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { setSidebarOpen }: { setSidebarOpen: ReactState<boolean>['setState'] } = useContext(MobilebarComponentContext)

  return (
    <button type='button' className='-m-2.5 p-2.5 text-gray-700 dark:text-gray-200 lg:hidden' onClick={() => setSidebarOpen(true)}>
      <span className='sr-only'>Open sidebar</span>
      <Bars3Icon className='h-6 w-6' aria-hidden='true' />
    </button>
  )
}

// eslint-disable-next-line react/display-name
MobilebarComponent.Dialog = ({ children }: { children: React.JSX.Element | React.JSX.Element[] }) => {
  // @ts-ignore
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { sidebarOpen, setSidebarOpen }: { sidebarOpen: ReactState<boolean>['state']; setSidebarOpen: ReactState<boolean>['setState'] } = useContext(MobilebarComponentContext)

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50 lg:hidden' onClose={setSidebarOpen}>
        <Transition.Child
          as={Fragment}
          enter='transition-opacity ease-linear duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity ease-linear duration-300'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-gray-900/80' />
        </Transition.Child>

        <div className='fixed inset-0 flex'>
          <Transition.Child
            as={Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'>
            <Dialog.Panel className='relative flex w-full max-w-xs flex-1 sm:max-w-sm'>
              <Transition.Child as={Fragment} enter='ease-in-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in-out duration-300' leaveFrom='opacity-100' leaveTo='opacity-0'>
                <div className='absolute right-0 top-0 z-10 flex w-16 justify-center pt-5'>
                  <button type='button' className='-m-2.5 p-2.5' onClick={() => setSidebarOpen(false)}>
                    <span className='sr-only'>Close sidebar</span>

                    <XMarkIcon className='h-6 w-6 text-black dark:text-gray-50' aria-hidden='true' />
                  </button>
                </div>
              </Transition.Child>

              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
