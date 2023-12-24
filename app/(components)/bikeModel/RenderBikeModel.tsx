'use client'
import { BikeModel } from '@/typings/Bike'
import { useState } from 'react'
import { WithId } from 'mongodb'
import useForm from '@/hooks/useForm'
import { DynamicText } from '@/app/(components)/Shared/Responsive/DynamicText'
import Rating from '@/app/(components)/Shared/Rating'
import structureClasses from '@/lib/Shared/structureClasses'
import InputGroup from '@/app/(components)/Shared/Forms/InputGroup'
import UpdateBikeModelAction from '@/actions/bikes/UpdateBikeModelAction'
import DeleteBikeModelAction from '@/actions/bikes/DeleteBikeModelAction'

export default function RenderBikeModel({ bikeModel: initialBikeModel, isPending, editable }: { bikeModel: WithId<BikeModel>; isPending?: boolean; editable?: boolean }) {
  const [bikeModel, setBikeModel] = useState<WithId<BikeModel>>(initialBikeModel)
  const { onChange } = useForm(bikeModel, setBikeModel)

  return (
    <form className='rounded-lg bg-neutral-200/50 px-4 py-2 dark:bg-neutral-700/40'>
      <h2 className='flex gap-2 border-b-[2px] border-gray-400 pb-1 text-lg font-semibold dark:border-gray-500 2sm:mb-4'>
        <DynamicText isPending={isPending} content={bikeModel.name} skHeight='h-4' skContainerClassName='py-1 flex-1' skBackground='bg-gray-300' className='flex-1' />
        <Rating reviews={bikeModel.reviews} isPending={isPending} />
      </h2>

      <div className={structureClasses('mb-2 flex flex-col gap-4 2sm:gap-2')}>
        <InputGroup name='_id' hidden className='flex-1 rounded-md px-2 py-1 dark:bg-neutral-600/60 dark:text-gray-200' defaultValue={bikeModel._id.toString()} readOnly />
        <InputGroup
          isPending={isPending}
          name='name'
          onChange={onChange}
          readOnly={!editable}
          className='flex-1 rounded-md px-2 py-1 dark:bg-neutral-600/60 dark:text-gray-200'
          defaultValue={bikeModel.name}
        />
        <InputGroup
          isPending={isPending}
          name='description'
          onChange={onChange}
          readOnly={!editable}
          className='flex-1 rounded-md px-2 py-1 dark:bg-neutral-600/60 dark:text-gray-200'
          defaultValue={bikeModel.description}
        />
        <InputGroup
          isPending={isPending}
          name='wheel_size'
          data-result='number'
          onChange={onChange}
          readOnly={!editable}
          className='flex-1 rounded-md px-2 py-1 dark:bg-neutral-600/60 dark:text-gray-200'
          defaultValue={bikeModel.wheel_size}
        />
        <InputGroup
          isPending={isPending}
          name='manufacturer'
          onChange={onChange}
          readOnly={!editable}
          className='flex-1 rounded-md px-2 py-1 dark:bg-neutral-600/60 dark:text-gray-200'
          defaultValue={bikeModel.manufacturer}
        />

        <InputGroup
          isPending={isPending}
          name='brakeType'
          onChange={onChange}
          readOnly={!editable}
          className='flex-1 rounded-md px-2 py-1 dark:bg-neutral-600/60 dark:text-gray-200'
          defaultValue={bikeModel.brakeType}
        />

        <InputGroup
          isPending={isPending}
          name='category'
          onChange={onChange}
          readOnly={!editable}
          className='flex-1 rounded-md px-2 py-1 dark:bg-neutral-600/60 dark:text-gray-200'
          defaultValue={bikeModel.category}
        />
      </div>

      <ActionButtons visible={editable} isPending={isPending} initialBike={initialBikeModel} bike={bikeModel} />
    </form>
  )
}

function ActionButtons({ isPending, visible, initialBike, bike }: { isPending?: boolean; visible?: boolean; initialBike: WithId<BikeModel>; bike: WithId<BikeModel> }) {
  if (!visible) return null

  if (isPending) {
    return (
      <div className='mt-4 flex h-8 justify-end gap-2'>
        <div className='flex w-[80px] items-center justify-center rounded-md bg-blue-800/50 px-2 py-1 uppercase tracking-wide text-gray-100 dark:bg-blue-400/50 dark:text-gray-200'>
          <DynamicText content='' skeletonClassName='flex-1 dark:bg-gray-400' skWidth='w-14' isPending />
        </div>

        <div className='flex w-[80px] items-center justify-center rounded-md bg-red-800/50 px-2 py-1 uppercase tracking-wide text-gray-100 dark:bg-red-400/50 dark:text-gray-200'>
          <DynamicText content='' skeletonClassName='flex-1 dark:bg-gray-400' skWidth='w-14' isPending />
        </div>
      </div>
    )
  }

  return (
    <div className='mt-4 flex justify-end gap-2'>
      <button
        className='rounded-md bg-blue-800/50 px-2 py-1 uppercase tracking-wide text-gray-100 dark:bg-blue-400/50 dark:text-gray-200'
        formAction={() => UpdateBikeModelAction(initialBike._id, bike)}>
        Update
      </button>
      <button className='rounded-md bg-red-800/50 px-2 py-1 uppercase tracking-wide text-gray-100 dark:bg-red-400/50 dark:text-gray-200' formAction={() => DeleteBikeModelAction(bike)}>
        Delete
      </button>
    </div>
  )
}
