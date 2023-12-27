import { Bike } from '@/typings/Bike'

export default interface Ticket {
  bike: Bike
  interval: {
    start: Date
    end: Date
  }
  price: number
}
