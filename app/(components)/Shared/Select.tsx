'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import ReactState from '@/typings/ReactState'
import { CheckIcon } from '@heroicons/react/24/solid'
import structureClasses from '@/lib/Shared/structureClasses'
import { twMerge } from 'tailwind-merge'
import { DynamicText } from '@/app/(components)/Shared/Responsive/DynamicText'

const SelectComponentContext = createContext({})

interface SelectComponentContextProps {
  open: ReactState<boolean>['state']
  setOpen: ReactState<boolean>['setState']
  selection: ReactState<(string | number)[]>['state']
  setSelection: ReactState<(string | number)[]>['setState']
  readOnly?: boolean
  isPending?: boolean
}

export function SelectComponent({
  children,
  preSelected,
  onSelect,
  className,
  readOnly,
  multiSelect,
  isPending,
}: {
  onSelect: (elements: Array<string | number>, resetSelect: (setToPreselect?: boolean) => void) => void
  preSelected?: Array<string | number>
  children: React.JSX.Element | React.JSX.Element[]
  className?: string
  readOnly?: boolean
  multiSelect?: boolean
  isPending?: boolean
}) {
  const [selection, setSelection] = useState<(string | number)[]>(preSelected ?? [])
  const [open, setOpen] = useState<boolean>(false)
  const [initialRender, setInitialRender] = useState<boolean>(true)

  useEffect(() => {
    if (!open) return

    const closeModalListener = (e: KeyboardEvent) => {
      if (e.code === 'Escape') setOpen(false)
    }
    window.addEventListener('keyup', closeModalListener)

    return () => window.removeEventListener('keyup', closeModalListener)
  }, [open])

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false)
      return
    }
    onSelect(selection, (setToPreselect) => {
      setInitialRender(true) //* so that there is no endless loop because of state-change.
      setSelection(setToPreselect ? preSelected ?? [] : [])
    })
  }, [selection])

  return (
    <div className={twMerge('', className)}>
      <SelectComponentContext.Provider value={{ selection, setSelection, open, setOpen, readOnly, multiSelect, isPending }}>{children}</SelectComponentContext.Provider>
    </div>
  )
}

// eslint-disable-next-line react/display-name
SelectComponent.Box = ({ placeHolder, className }: { className?: string; placeHolder?: string }) => {
  // @ts-ignore
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { setOpen, selection, isPending }: SelectComponentContextProps = useContext(SelectComponentContext)

  return (
    <button
      onClick={() => (isPending ? null : setOpen((prev) => !prev))}
      className={twMerge(
        'flex h-8 w-full cursor-default items-center overflow-x-hidden rounded-md bg-white py-1.5 pl-3 text-left text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-neutral-600/60 dark:text-gray-200 dark:ring-gray-600 dark:focus:ring-blue-600/60 sm:leading-6',
        selection?.length === 0 ? 'text-gray-500 dark:text-gray-400' : '',
        className,
      )}>
      <DynamicText content={selection?.length > 0 ? selection?.join(', ') : placeHolder} className='block flex-1 overflow-x-hidden truncate pr-6' skContainerClassName='flex-1' isPending={isPending} />

      <span className='pointer-events-none inset-y-0 flex items-center pr-2'>
        <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
      </span>
    </button>
  )
}

// eslint-disable-next-line react/display-name
SelectComponent.Modal = ({ children, className }: { className?: string; children: React.JSX.Element | React.JSX.Element[] }) => {
  // @ts-ignore
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { open }: SelectComponentContextProps = useContext(SelectComponentContext)

  return (
    <Transition
      show={open}
      enter='duration-75 transition ease-in'
      enterFrom='opacity-70 -translate-y-1'
      enterTo='opacity-100 translate-y-0 z-20'
      leave='transition ease-in duration-100'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'>
      <div
        className={twMerge(
          'absolute left-0 right-0 top-0 mt-2 grid max-h-96 grid-cols-1 divide-y overflow-y-auto overflow-x-hidden rounded-md bg-white shadow-lg ring-1 ring-inset ring-gray-300 dark:divide-gray-500/60 dark:bg-neutral-700 dark:ring-gray-600',
          className,
        )}>
        {children}
      </div>
    </Transition>
  )
}

// eslint-disable-next-line react/display-name
SelectComponent.ModalOptions = ({ value, className }: { className?: string; value: string | number }) => {
  // @ts-ignore
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { selection, setSelection, readOnly, multiSelect, setOpen }: SelectComponentContextProps = useContext(SelectComponentContext)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selected, setSelected] = useState<boolean>(!!selection?.find((el) => el === value))

  const addToSelection = () => {
    if (!multiSelect) return setSelection([value])

    setSelection((prev) => (prev.find((el) => el === value) ? [...prev] : [...prev, value]))
  }
  const removeFromSelection = () => setSelection((prev) => prev.filter((s) => s.toString() !== value.toString()))

  const handleClick = () => {
    if (selection.find((s) => s === value)) {
      //? remove from selection
      removeFromSelection()
    } else {
      addToSelection()
    }

    setSelected((prev) => !prev)
    if (!multiSelect) setOpen(false) //? close on select for single select-mode
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (multiSelect) return

    //? Deselect all the other options that were previsouly selected (since only option can be selected (multiSelect: false)
    if (selection?.at(0) !== value) setSelected(false)
  }, [selection])

  return (
    <button
      className={twMerge('text-md group flex items-center rounded-sm py-2 text-left text-sm transition duration-100 hover:bg-blue-400/30 dark:text-gray-200 dark:hover:bg-blue-600/60', className)}
      onClick={() => (readOnly ? null : handleClick())}>
      <span className={structureClasses('flex-1 px-3', selected ? 'font-semibold dark:text-gray-100' : '')}>{value}</span>
      <Transition
        show={selected}
        enter='transistion duration-100'
        enterFrom='opacity-0 translate-x-5'
        enterTo='opacity-100 translate-x-0'
        leave='transistion duration-100'
        leaveFrom='opacity-100 translate-x-0'
        leaveTo='opacity-0 translate-x-5'>
        <CheckIcon className={twMerge('mr-4 h-5 w-5')} />
      </Transition>
    </button>
  )
}
