'use client'
import { ParkingPlace } from "@/typings/Bike";
import ReactState from "@/typings/ReactState";
import Station from "@/typings/Station";
import { Transition } from "@headlessui/react";
import { createContext, useContext, useState } from "react";
import BookingCheckout from "./BookingCheckout";
import DisplayBookingOption from "./DisplayBookingOption";

interface AvailableStationBikesContextProps {
	selection: ReactState<ParkingPlace[]>['state']
	setSelection: ReactState<ParkingPlace[]>['setState']
	isSelected: (parkingPlace: ParkingPlace) => boolean
	interval: ReactState<{ start: Date; end: Date }>['state']
	setInterval: ReactState<{ start: Date; end: Date }>['setState']
}

const AvailableStationBikesContext = createContext<AvailableStationBikesContextProps | undefined>(undefined)

/**
 * 
 * @returns Returns the Context of the AvailableStationBikesContextProvider
 */
export function useAvailableStationBikesContext() {
	'use client'
	const context = useContext(AvailableStationBikesContext)

	if (!context) throw new Error('useAvailableStationBikesContext must be used within a AvailableStationBikesContextProvider')

	return context
}

export default function AvailableStationBikes({ station }: { station: Station }) {
	const [selection, setSelection] = useState<ParkingPlace[]>([])
	const [interval, setInterval] = useState<{ start: Date; end: Date }>({ start: new Date(Date.now()), end: new Date(Date.now()) })

	//* Get all parking places that are occupied
	const parkingPlaces = station.address.parkingPlaces?.filter((pp) => !!pp.bike)

	//* If there are no occupied parking places, return early
	if (!parkingPlaces || parkingPlaces.length === 0) return null

	const isSelected = (parkingPlace: ParkingPlace) => !!selection.find((pp) => pp.id === parkingPlace.id)

	return (
		<AvailableStationBikesContext.Provider value={{ selection, setSelection, isSelected, interval, setInterval }}>
			<div className='flex flex-row gap-2 overflow-x-hidden justify-between items-start h-[95dvh]'>
				<div className='flex gap-4 flex-wrap'>
					{parkingPlaces.map((pp) => (<DisplayBookingOption key={pp.id} parkingPlace={pp} />))}
				</div>

				<Transition className='h-full' show={selection.length > 0} enter="duration-500 ease-out" leave="duration-300 ease-in" enterFrom="opacity-0 translate-x-52" enterTo="opacity-100 translate-x-0" leaveFrom="opacity-100 translate-x-0" leaveTo="opacity-0 translate-x-52">
					<BookingCheckout />
				</Transition>
			</div>
		</AvailableStationBikesContext.Provider>
	)
}



