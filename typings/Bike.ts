import Review from '@/typings/Review'
import { WithId } from 'mongodb'

export interface Bike {
  _id: string
  model: WithId<BikeModel>
}

export interface BikeModel {
  name: string
  description: string
  wheel_size: number
  manufacturer: string
  brakeType: BikeBreakType['name']
  category: BikeCategory['name']
  reviews: Review[]
}

export interface BikeBreakType {
  name: 'Disc' | 'Frame'
}

export function getDummyBikeBreakType(): Array<BikeBreakType['name']> {
  return ['Disc', 'Frame']
}

export interface ParkingPlace {
  id: number
  allowedCategories: Array<BikeCategory['name']>
  bike?: Bike
}

export interface BikeCategory {
  name: 'Electric' | 'Mountain' | 'City' | 'Children'
}

export function getDummyBikeCategories(): Array<BikeCategory['name']> {
  return ['Electric', 'Mountain', 'City', 'Children']
}
