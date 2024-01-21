import { SideElementProps } from '@/app/(components)/root/NavigationBar/SideElement'
import DesktopSidebar from '@/app/(components)/root/NavigationBar/DesktopSidebar'
import MobileSidebar from '@/app/(components)/root/NavigationBar/MobileSidebar'
import getSessionData from '@/lib/Shared/getSessionData'

export default async function SideBar() {
  const { data } = await getSessionData()

  const elements: SideElementProps[] = [
    { name: 'Home', icon: 'HomeIcon', href: '/' },
    {
      name: 'Browse',
      icon: 'FolderIcon',
      subitems: [
        {
          name: 'Rental Shops',
          href: '/stations/',
          icon: 'BuildingStoreFrontIcon',
          badge: 15,
        },
        {
          name: 'Available Bikes',
          href: '/bikes/',
          icon: 'ShoppingBagIcon',
          badge: 45,
        },
      ],
    },
    { name: 'Book Tickets', icon: 'CursorArrowRaysIcon', href: '/tickets' },
  ]
  const managementElements: SideElementProps[] = [
    {
      icon: 'LockOpenIcon',
      name: 'Management',
      subitems: [
        {
          icon: 'AdjustmentsVerticalIcon',
          name: 'Manage Stations',
          href: '/management/stations',
        },
        {
          icon: 'AdjustmentsVerticalIcon',
          name: 'Manage Bikes',
          href: '/management/bikes',
        },
      ],
    },
  ]

  if (data?.managementAccess) elements.push(...managementElements)

  return (
    <>
      <MobileSidebar elements={elements} />
      <DesktopSidebar elements={elements} />
    </>
  )
}
