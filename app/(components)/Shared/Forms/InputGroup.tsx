import { twMerge } from 'tailwind-merge'
import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { DynamicText, ResponsiveElementProps } from '@/app/(components)/Shared/Responsive/DynamicText'

export interface InputGroupProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, ResponsiveElementProps {
  labelClassName?: string
}

export default function InputGroup(props: InputGroupProps) {
  let id = props.id
  if (!id) id = [props?.defaultValue?.toString() ?? '', props?.name?.toString() ?? ''].join('')

  if (props.isPending) {
    return (
      <div className='flex items-center gap-2'>
        <DynamicText content='' skWidth='w-16' isPending skBackground='bg-gray-300' />
        <div className='flex flex-1 rounded-md dark:bg-neutral-600/60'>
          <DynamicText content='' skWidth='w-full' skContainerClassName='flex-1 py-2 px-2' skBackground='bg-gray-300' isPending />
        </div>
      </div>
    )
  }

  // const inputProps = props
  const inputProps = { ...props }
  delete inputProps.isPending

  return (
    <div className='flex flex-col gap-1.5 2sm:flex-row 2sm:items-center 2sm:gap-2'>
      {id && inputProps.name && !inputProps.hidden && (
        <label htmlFor={id} className={twMerge('min-w-[50px] capitalize', inputProps.labelClassName)}>
          {inputProps.name?.replace(/[^A-Za-z0-9]/g, ' ')}:
        </label>
      )}
      <input {...inputProps} id={id} />
    </div>
  )
}
