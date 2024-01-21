import { Session } from 'next-auth'

export default interface Review {
  customer: Session['user']
  comment?: string
  rating: 1 | 2 | 3 | 4 | 5
}
