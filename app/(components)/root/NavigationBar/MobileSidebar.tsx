import SideElement, { SideElementProps } from '@/app/(components)/root/NavigationBar/SideElement'
import MobilebarComponent from '@/app/(components)/root/NavigationBar/Mobile/MobilebarComponent'
import structureClasses from '@/lib/Shared/structureClasses'
import ProfileBanner from '@/app/(components)/root/NavigationBar/ProfileBanner'

export default function MobileSidebar({ elements }: { elements: SideElementProps[] }) {
  return (
    <MobilebarComponent>
      <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2 dark:bg-neutral-800'>
        <div className='mb-2 flex h-14 shrink-0 items-center border-b-2 border-solid border-gray-400 dark:border-gray-200'>
          <svg className='h-8 w-auto dark:fill-white' fill='#000000' viewBox='0 -3 38 38' version='1.1' xmlns='http://www.w3.org/2000/svg'>
            <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
            <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
            <g id='SVGRepo_iconCarrier'>
              {' '}
              <title>bike</title>{' '}
              <path d='M29.998 28.197c-4.212 0-7.627-3.414-7.627-7.627 0-3.090 1.842-5.745 4.484-6.943l-1.014-2.283 0.165 0.399-6.944 9.321v1.869h1.017v1.018h-3.052v-1.018h1.018v-1.018l-2.877-0.27c-0.524 3.701-3.696 6.551-7.542 6.551-4.212 0.001-7.626-3.413-7.626-7.626 0-4.212 3.414-7.626 7.627-7.626 1.101 0 2.145 0.238 3.090 0.657l1.906-4.788-0.865-2.416c-0.38 0-0.734 0-1.017 0-0.954 0-0.699-1.017-0.699-1.017s0.063-0.89 0.763-0.89 0.699 0.636 1.843 0.636c1.095 0 2.669 0.317 2.669 0.317s0.699 0.953-0.635 0.953c-0.604 0-1.269 0-1.907 0l0.723 2.597h11.052l-0.868-1.973h-0.675v-1.016h4.067v1.017h-2.298l2.977 6.26c0.71-0.219 1.465-0.337 2.246-0.337 4.212 0 7.627 3.414 7.627 7.626-0.001 4.213-3.416 7.627-7.628 7.627zM7.627 13.96c-3.651 0-6.61 2.959-6.61 6.61s2.959 6.609 6.61 6.609c3.319 0 6.060-2.449 6.53-5.639l-5.294-0.545c-0.084 0.477-0.481 0.846-0.982 0.846-0.562 0-1.017-0.455-1.017-1.018 0-0.561 0.455-1.018 1.017-1.018 0.12 0 0.232 0.031 0.339 0.070l2.121-5.33c-0.829-0.372-1.746-0.585-2.714-0.585zM9.152 20.125l5.079 0.537c0.001-0.031 0.005-0.061 0.005-0.092 0-2.35-1.229-4.408-3.077-5.581l-2.007 5.136zM13.077 10.082l-1.543 3.948c2.225 1.332 3.719 3.759 3.719 6.541 0 0.066-0.008 0.133-0.010 0.199l1.726 0.182-3.892-10.87zM24.978 9.396v0.614h-11.12l4.050 10.839 7.687-10.065-0.617-1.388zM29.998 13.96c-0.637 0-1.251 0.095-1.834 0.264l2.374 5.424c0.482 0.078 0.858 0.48 0.858 0.984 0 0.562-0.455 1.018-1.017 1.018s-1.018-0.455-1.018-1.018c0-0.273 0.111-0.521 0.289-0.705l-2.384-5.372c-2.287 1.040-3.879 3.338-3.879 6.014 0 3.65 2.959 6.609 6.609 6.609s6.609-2.959 6.609-6.609-2.957-6.609-6.607-6.609z'></path>{' '}
            </g>
          </svg>
          <span className='text-md flex-1 pr-10 text-center font-semibold leading-6 text-gray-700 dark:text-gray-200'>Navigation</span>
        </div>

        <nav className='flex flex-1 flex-col'>
          <ul role='list' className='flex flex-1 flex-col gap-y-7'>
            <li>
              <ul role='list' className='-mx-2 space-y-1'>
                {elements.map((item) => (
                  <SideElement key={item.name} {...item} />
                ))}
              </ul>
            </li>
            <li className={structureClasses('-mx-6 mt-auto')}>
              <ProfileBanner />
            </li>
          </ul>
        </nav>
      </div>
    </MobilebarComponent>
  )

  // return (
  //   <MobilebarComponent>
  //     <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2 dark:bg-neutral-800'>
  //       <div className='mb-2 flex h-14 shrink-0 items-center border-b-2 border-solid border-gray-400 dark:border-gray-200'>
  //         <svg className='h-8 w-auto dark:fill-white' fill='#000000' viewBox='0 -3 38 38' version='1.1' xmlns='http://www.w3.org/2000/svg'>
  //           <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
  //           <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
  //           <g id='SVGRepo_iconCarrier'>
  //             {' '}
  //             <title>bike</title>{' '}
  //             <path d='M29.998 28.197c-4.212 0-7.627-3.414-7.627-7.627 0-3.090 1.842-5.745 4.484-6.943l-1.014-2.283 0.165 0.399-6.944 9.321v1.869h1.017v1.018h-3.052v-1.018h1.018v-1.018l-2.877-0.27c-0.524 3.701-3.696 6.551-7.542 6.551-4.212 0.001-7.626-3.413-7.626-7.626 0-4.212 3.414-7.626 7.627-7.626 1.101 0 2.145 0.238 3.090 0.657l1.906-4.788-0.865-2.416c-0.38 0-0.734 0-1.017 0-0.954 0-0.699-1.017-0.699-1.017s0.063-0.89 0.763-0.89 0.699 0.636 1.843 0.636c1.095 0 2.669 0.317 2.669 0.317s0.699 0.953-0.635 0.953c-0.604 0-1.269 0-1.907 0l0.723 2.597h11.052l-0.868-1.973h-0.675v-1.016h4.067v1.017h-2.298l2.977 6.26c0.71-0.219 1.465-0.337 2.246-0.337 4.212 0 7.627 3.414 7.627 7.626-0.001 4.213-3.416 7.627-7.628 7.627zM7.627 13.96c-3.651 0-6.61 2.959-6.61 6.61s2.959 6.609 6.61 6.609c3.319 0 6.060-2.449 6.53-5.639l-5.294-0.545c-0.084 0.477-0.481 0.846-0.982 0.846-0.562 0-1.017-0.455-1.017-1.018 0-0.561 0.455-1.018 1.017-1.018 0.12 0 0.232 0.031 0.339 0.070l2.121-5.33c-0.829-0.372-1.746-0.585-2.714-0.585zM9.152 20.125l5.079 0.537c0.001-0.031 0.005-0.061 0.005-0.092 0-2.35-1.229-4.408-3.077-5.581l-2.007 5.136zM13.077 10.082l-1.543 3.948c2.225 1.332 3.719 3.759 3.719 6.541 0 0.066-0.008 0.133-0.010 0.199l1.726 0.182-3.892-10.87zM24.978 9.396v0.614h-11.12l4.050 10.839 7.687-10.065-0.617-1.388zM29.998 13.96c-0.637 0-1.251 0.095-1.834 0.264l2.374 5.424c0.482 0.078 0.858 0.48 0.858 0.984 0 0.562-0.455 1.018-1.017 1.018s-1.018-0.455-1.018-1.018c0-0.273 0.111-0.521 0.289-0.705l-2.384-5.372c-2.287 1.040-3.879 3.338-3.879 6.014 0 3.65 2.959 6.609 6.609 6.609s6.609-2.959 6.609-6.609-2.957-6.609-6.607-6.609z'></path>{' '}
  //           </g>
  //         </svg>
  //         <span className='text-md flex-1 pr-10 text-center font-semibold leading-6 text-gray-700 dark:text-gray-200'>Navigation</span>
  //       </div>
  //
  //       <nav className='flex flex-1 flex-col'>
  //         <ul role='list' className='flex flex-1 flex-col gap-y-7'>
  //           <li>
  //             <ul role='list' className='-mx-2 space-y-1'>
  //               {elements.map((item) => (
  //                 <SideElement key={item.name} {...item} />
  //               ))}
  //             </ul>
  //           </li>
  //           <li className={structureClasses('-mx-6 mt-auto')}>
  //             <ProfileBanner />
  //           </li>
  //         </ul>
  //       </nav>
  //     </div>
  //   </MobilebarComponent>
  // )

  // const [sidebarOpen, setSidebarOpen] = useState(false)
  //
  // return (
  //   <>
  //     <div className='sticky top-0 z-40 flex select-text items-center gap-x-6 bg-white px-4 py-4 shadow-sm dark:bg-neutral-800 sm:px-6 lg:hidden'>
  //       <button type='button' className='-m-2.5 p-2.5 text-gray-700 dark:text-gray-200 lg:hidden' onClick={() => setSidebarOpen(true)}>
  //         <span className='sr-only'>Open sidebar</span>
  //
  //         <Bars3Icon className='h-6 w-6' aria-hidden='true' />
  //       </button>
  //
  //       <div className='flex-1 text-center text-lg font-semibold leading-6 text-gray-700 dark:text-gray-200'>Bike Rental</div>
  //
  //       <ColorModeSwitcher className='text-gray-700 dark:text-gray-200' />
  //     </div>
  //
  //     <Transition.Root show={sidebarOpen} as={Fragment}>
  //       <Dialog as='div' className='relative z-50 lg:hidden' onClose={setSidebarOpen}>
  //         <Transition.Child
  //           as={Fragment}
  //           enter='transition-opacity ease-linear duration-300'
  //           enterFrom='opacity-0'
  //           enterTo='opacity-100'
  //           leave='transition-opacity ease-linear duration-300'
  //           leaveFrom='opacity-100'
  //           leaveTo='opacity-0'>
  //           <div className='fixed inset-0 bg-gray-900/80' />
  //         </Transition.Child>
  //
  //         <div className='fixed inset-0 flex'>
  //           <Transition.Child
  //             as={Fragment}
  //             enter='transition ease-in-out duration-300 transform'
  //             enterFrom='-translate-x-full'
  //             enterTo='translate-x-0'
  //             leave='transition ease-in-out duration-300 transform'
  //             leaveFrom='translate-x-0'
  //             leaveTo='-translate-x-full'>
  //             <Dialog.Panel className='relative flex w-full max-w-xs flex-1 sm:max-w-sm'>
  //               <Transition.Child
  //                 as={Fragment}
  //                 enter='ease-in-out duration-300'
  //                 enterFrom='opacity-0'
  //                 enterTo='opacity-100'
  //                 leave='ease-in-out duration-300'
  //                 leaveFrom='opacity-100'
  //                 leaveTo='opacity-0'>
  //                 <div className='absolute right-0 top-0 z-10 flex w-16 justify-center pt-5'>
  //                   <button type='button' className='-m-2.5 p-2.5' onClick={() => setSidebarOpen(false)}>
  //                     <span className='sr-only'>Close sidebar</span>
  //
  //                     <XMarkIcon className='h-6 w-6 text-black dark:text-gray-50' aria-hidden='true' />
  //                   </button>
  //                 </div>
  //               </Transition.Child>
  //
  //               <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2 dark:bg-neutral-800'>
  //                 <div className='mb-2 flex h-14 shrink-0 items-center border-b-2 border-solid border-gray-400 dark:border-gray-200'>
  //                   <svg className='h-8 w-auto dark:fill-white' fill='#000000' viewBox='0 -3 38 38' version='1.1' xmlns='http://www.w3.org/2000/svg'>
  //                     <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
  //                     <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
  //                     <g id='SVGRepo_iconCarrier'>
  //                       {' '}
  //                       <title>bike</title>{' '}
  //                       <path d='M29.998 28.197c-4.212 0-7.627-3.414-7.627-7.627 0-3.090 1.842-5.745 4.484-6.943l-1.014-2.283 0.165 0.399-6.944 9.321v1.869h1.017v1.018h-3.052v-1.018h1.018v-1.018l-2.877-0.27c-0.524 3.701-3.696 6.551-7.542 6.551-4.212 0.001-7.626-3.413-7.626-7.626 0-4.212 3.414-7.626 7.627-7.626 1.101 0 2.145 0.238 3.090 0.657l1.906-4.788-0.865-2.416c-0.38 0-0.734 0-1.017 0-0.954 0-0.699-1.017-0.699-1.017s0.063-0.89 0.763-0.89 0.699 0.636 1.843 0.636c1.095 0 2.669 0.317 2.669 0.317s0.699 0.953-0.635 0.953c-0.604 0-1.269 0-1.907 0l0.723 2.597h11.052l-0.868-1.973h-0.675v-1.016h4.067v1.017h-2.298l2.977 6.26c0.71-0.219 1.465-0.337 2.246-0.337 4.212 0 7.627 3.414 7.627 7.626-0.001 4.213-3.416 7.627-7.628 7.627zM7.627 13.96c-3.651 0-6.61 2.959-6.61 6.61s2.959 6.609 6.61 6.609c3.319 0 6.060-2.449 6.53-5.639l-5.294-0.545c-0.084 0.477-0.481 0.846-0.982 0.846-0.562 0-1.017-0.455-1.017-1.018 0-0.561 0.455-1.018 1.017-1.018 0.12 0 0.232 0.031 0.339 0.070l2.121-5.33c-0.829-0.372-1.746-0.585-2.714-0.585zM9.152 20.125l5.079 0.537c0.001-0.031 0.005-0.061 0.005-0.092 0-2.35-1.229-4.408-3.077-5.581l-2.007 5.136zM13.077 10.082l-1.543 3.948c2.225 1.332 3.719 3.759 3.719 6.541 0 0.066-0.008 0.133-0.010 0.199l1.726 0.182-3.892-10.87zM24.978 9.396v0.614h-11.12l4.050 10.839 7.687-10.065-0.617-1.388zM29.998 13.96c-0.637 0-1.251 0.095-1.834 0.264l2.374 5.424c0.482 0.078 0.858 0.48 0.858 0.984 0 0.562-0.455 1.018-1.017 1.018s-1.018-0.455-1.018-1.018c0-0.273 0.111-0.521 0.289-0.705l-2.384-5.372c-2.287 1.040-3.879 3.338-3.879 6.014 0 3.65 2.959 6.609 6.609 6.609s6.609-2.959 6.609-6.609-2.957-6.609-6.607-6.609z'></path>{' '}
  //                     </g>
  //                   </svg>
  //                   <span className='text-md flex-1 pr-10 text-center font-semibold leading-6 text-gray-700 dark:text-gray-200'>Navigation</span>
  //                 </div>
  //
  //                 <nav className='flex flex-1 flex-col'>
  //                   <ul role='list' className='flex flex-1 flex-col gap-y-7'>
  //                     <li>
  //                       <ul role='list' className='-mx-2 space-y-1'>
  //                         {elements.map((item) => (
  //                           <SideElement key={item.name} {...item} />
  //                         ))}
  //                       </ul>
  //                     </li>
  //                     <li className={structureClasses('-mx-6 mt-auto')}>{/*<ProfileBanner />*/}</li>
  //                   </ul>
  //                 </nav>
  //               </div>
  //             </Dialog.Panel>
  //           </Transition.Child>
  //         </div>
  //       </Dialog>
  //     </Transition.Root>
  //   </>
  // )
}
