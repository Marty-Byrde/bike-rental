import { ComponentType } from 'react'
import IconProps from '@/typings/Icon'
import FolderIcon from '@/svgs/outline/FolderIcon'
import BuildingStoreFrontIcon from '@/svgs/outline/BuildingStoreFrontIcon'
import CursorArrowRaysIcon from '@/svgs/outline/CursorArrowRaysIcon'
import ShoppingBagIcon from '@/svgs/outline/ShoppingBagIcon'
import HomeIcon from '@/svgs/outline/HomeIcon'
import AdjustmentsVerticalIcon from '@/svgs/outline/AdjustmentsVerticalIcon'
import LockOpenIcon from '@/svgs/outline/LockOpenIcon'

export interface useIconProps {
  iconName: 'FolderIcon' | 'AdjustmentsVerticalIcon' | 'BuildingStoreFrontIcon' | 'CursorArrowRaysIcon' | 'HomeIcon' | 'ShoppingBagIcon' | 'LockOpenIcon' | undefined
}

export default function useIcon(iconName: useIconProps['iconName']) {
  let Icon = (): ComponentType<IconProps> => {
    switch (iconName) {
      case 'FolderIcon':
        return FolderIcon

      case 'AdjustmentsVerticalIcon':
        return AdjustmentsVerticalIcon

      case 'HomeIcon':
        return HomeIcon

      case 'BuildingStoreFrontIcon':
        return BuildingStoreFrontIcon

      case 'CursorArrowRaysIcon':
        return CursorArrowRaysIcon

      case 'ShoppingBagIcon':
        return ShoppingBagIcon

      case 'LockOpenIcon':
        return LockOpenIcon

      default:
        return () => null
    }
  }

  return Icon()
}
