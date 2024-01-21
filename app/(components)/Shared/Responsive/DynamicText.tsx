import { v4 as uuidV4 } from 'uuid'
import { twMerge } from 'tailwind-merge'

export interface ResponsiveElementProps {
  isPending?: boolean
  className?: string

  skWidth?: 'w-48' | string
  skHeight?: 'h-2' | string
  skBackground?: 'bg-gray-200' | string
  skDarkBackground?: 'dark:bg-gray-700' | string
  skeletonClassName?: string
  skContainerClassName?: string
}

interface TextProps extends ResponsiveElementProps {
  content: string | string[] | undefined
  containerFullWidth?: boolean
  title?: string

  textSize?: 'text-sm' | string
  color?: 'text-black' | string
  darkColor?: 'text-white' | string

  skLines?: number
}

export function DynamicText(props: TextProps) {
  const { content, isPending, color, darkColor, textSize, className, title, containerFullWidth } = props
  const { skeletonClassName, skContainerClassName, skWidth, skHeight, skBackground, skDarkBackground, skLines } = props

  if (isPending) {
    const lines = []
    const makeLine = () => (
      <div key={uuidV4() + '-text-skeleton'} className={twMerge('h-2 w-48 rounded-full bg-gray-200 dark:bg-gray-500', skeletonClassName, skWidth, skHeight, skBackground, skDarkBackground)} />
    )

    for (let i = 0; i < (skLines ?? 1); i++) {
      lines.push(makeLine())
    }

    return <div className={twMerge(`animate-pulse`, containerFullWidth ? 'w-full' : '', skContainerClassName)}>{skLines ? lines : makeLine()}</div>
  }

  return (
    <span title={title} className={twMerge('text-lg text-gray-900 dark:text-gray-200', className, textSize, color, darkColor)}>
      {content ?? ''}
    </span>
  )
}
