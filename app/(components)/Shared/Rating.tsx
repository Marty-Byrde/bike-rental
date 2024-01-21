import { StarIcon } from '@heroicons/react/20/solid'
import structureClasses from '@/lib/Shared/structureClasses'
import Review from '@/typings/Review'

export default function Rating({ reviews, isPending }: { reviews: Review[]; isPending?: boolean }) {
  const ratings = reviews?.reduce((sum, review) => sum + review.rating, 0)
  const averageRating = ratings / reviews?.length
  const roundedAverage = Number(averageRating.toFixed(0))

  return (
    <div className='mt-1 flex items-center'>
      {[0, 1, 2, 3, 4].map((count) => (
        <StarIcon
          key={count}
          className={structureClasses(
            isPending ? 'animate-pulse' : '',
            roundedAverage > count ? 'text-yellow-600 dark:text-yellow-400/80' : 'text-gray-800/60 dark:text-gray-300/60',
            'h-5 w-5 flex-shrink-0',
          )}
          aria-hidden='true'
        />
      ))}
      <p className='sr-only'>{roundedAverage} out of 5 stars</p>
    </div>
  )
}
