import { Bike, BikeModel } from "@/typings/Bike";
import { WithId } from "mongodb";
import { twMerge } from "tailwind-merge";

export default function RenderSimpleBike({ bike, heading, ignoredModelProps, className }: { bike: Bike, heading?: string, ignoredModelProps?: Array<keyof WithId<BikeModel>>, className?: string }) {

  const RenderProperty = ({ propertyKey, ignoredProps }: { propertyKey: keyof WithId<BikeModel>; ignoredProps?: typeof ignoredModelProps }) => {
    if (ignoredProps?.includes(propertyKey)) return null
    if (propertyKey === 'reviews') return null
    if (propertyKey === '_id') return null
    if (propertyKey === 'name') return null

    return (
      <div className='flex flex-col gap-2 2sm:flex-row 2sm:items-center text-sm'>
        <span className=''>{propertyKey}:</span>
        <span className='italic'>{bike!.model[propertyKey]}</span>
      </div>
    )
  }

  return <div className={twMerge('flex flex-col gap-2', className)}>
    <h2 className='text-lg font-semibold'>{heading ?? bike.model.name}</h2>
    {Object.keys(bike.model).map((key) => <RenderProperty ignoredProps={ignoredModelProps} key={key} propertyKey={key as keyof WithId<BikeModel>} />)}
  </div>
}

