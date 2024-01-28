import { Bike } from '@/typings/Bike'

export default interface Ticket {
  bikes: Array<Bike>
  interval: {
    start: Date
    end: Date
  }
  price: number
}
