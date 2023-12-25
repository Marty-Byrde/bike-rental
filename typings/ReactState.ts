import { Dispatch, SetStateAction } from 'react'

export default interface ReactState<T> {
  state: T
  setState: Dispatch<SetStateAction<T>>
}
