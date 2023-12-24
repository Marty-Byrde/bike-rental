import Review from '@/typings/Review'

export default interface BikeModel {
  id: number
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

export interface ParkingPlace {
  id: number
  allowedCategories: Array<BikeCategory['name']>
  bike?: BikeModel
}

export interface BikeCategory {
  name: 'Electric' | 'Mountain' | 'City' | 'Children'
}
