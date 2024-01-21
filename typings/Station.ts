import { ParkingPlace } from '@/typings/Bike'
import Review from '@/typings/Review'

export default interface Station {
  name: string
  address: StationAddress
  reviews: Review[]
}

export interface StationAddress {
  city: string
  coordinates: number[]
  parkingPlaces: ParkingPlace[]
}
