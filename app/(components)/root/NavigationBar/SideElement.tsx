'use client'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { twMerge } from 'tailwind-merge'
import { Disclosure, Transition } from '@headlessui/react'
import structureClasses from '@/lib/Shared/structureClasses'
import Link from 'next/link'
import useIcon, { useIconProps } from '@/lib/Shared/useIcon'

export interface SideElementProps {
  name: string
  href?: string
  icon?: useIconProps['iconName']
  isOpen?: boolean
  subitems?: SideElementProps[] | any[]
  badge?: number
}

/**
 * This component renders a SideElement that displays subitems below it when unfolded. If the element has no subitems then it renders a Link that redirects the user.
 * @param element
 * @constructor
 */
export default function SideElement(element: SideElementProps) {
  const containerClasses = structureClasses('group flex gap-x-3 p-2 items-center font-semibold hover:bg-gray-50 dark:hover:bg-gray-700/40 rounded-md ')

  if (!element.subitems?.length)
    return (
      <li>
        <Link className={containerClasses} href={element.href ?? '#'}>
          <BasicElement {...element} />
        </Link>
      </li>
    )

  return (
    <Disclosure as='li' key={element.name} className={twMerge('flex flex-col')}>
      {({ open }) => (
        <>
          <Disclosure.Button className={containerClasses}>
            <BasicElement {...element} isOpen={open} />
          </Disclosure.Button>

          <Transition
            show={open}
            enter='transition duration-175 ease-out'
            enterFrom='transform scale-95 opacity-0'
            enterTo='transform scale-100 opacity-100'
            leave='transition duration-75 ease-out'
            leaveFrom='transform scale-100 opacity-100'
            leaveTo='transform scale-95 h-0 opacity-0'>
            <Disclosure.Panel static as='ul' className='pl-8'>
              {element?.subitems?.map((el) => <SideElement key={el.name} {...el} />)}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  )
}

/**
 * Renders a basic sidebar-element, with an icon, title, potential badge of its subitems-length and a icon at the right if it has some subitems
 * @param name The name that is being displayed
 * @param Img The icon that is placed before the element's name
 * @param subitems The items that are listed below the element when the dropdown is expanded
 * @param isOpen The state that indicates whether the element's subitems are to be displyed, thus the category is opened.
 * @constructor
 */
function BasicElement({ name, icon: iconName, subitems, isOpen, badge }: SideElementProps) {
  const Icon = useIcon(iconName)

  const imgClasses = structureClasses(
    isOpen ? 'text-indigo-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 dark:group-hover:stroke-blue-400 group-hover:text-indigo-600',
    'h-6 w-6 shrink-0',
  )

  return (
    <>
      <Icon key={name + isOpen} className={imgClasses} />
      <span className={twMerge('text-sm leading-6 text-gray-600 group-hover:text-indigo-600 dark:text-gray-300 dark:group-hover:text-blue-400', isOpen ? 'text-indigo-600 dark:text-blue-400' : '')}>
        {name}
      </span>
      <div className='flex flex-1 items-center justify-end gap-2'>
        <Badge count={badge} />
        <div
          className={twMerge(
            'transistion-rotate text-gray-800 duration-200 group-hover:scale-125 group-hover:text-indigo-600 dark:text-gray-300  dark:group-hover:scale-[125%] dark:group-hover:text-blue-400',
            isOpen ? 'rotate-90 scale-125 text-indigo-600 dark:scale-[130%] dark:text-blue-400' : '',
            subitems?.length ? '' : 'hidden',
          )}>
          <ChevronRightIcon className='h-4' />
        </div>
      </div>
    </>
  )
}

function Badge({ count, className }: { count?: number; className?: string }) {
  if (!count) return null

  return (
    <div className={twMerge('flex items-center justify-end', className)}>
      <span className='rounded-xl bg-white px-3 py-0.5 text-xs font-normal text-gray-800 ring-1 ring-gray-200 dark:bg-neutral-700 dark:text-gray-200/70 dark:ring-gray-600'>
        {count > 20 ? '20+' : count.toString()}
      </span>
    </div>
  )
}
