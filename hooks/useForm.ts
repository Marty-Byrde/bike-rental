import ReactState from '@/typings/ReactState'
import { ChangeEvent } from 'react'

export default function useForm<T>(state: ReactState<T>['state'], setState: ReactState<T>['setState']) {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, dataset } = e.target
    let typedValue: string | number | Array<number | string> = value
    let resultType: 'string' | 'number' | 'array<number>' | 'array<string>'

    switch (dataset?.result) {
      case 'array<number>':
        resultType = 'array<number>'
        break

      case 'array<string>':
        resultType = 'array<string>'
        break

      case 'number':
        resultType = 'number'
        break

      default:
        resultType = 'string'
    }

    if (resultType.startsWith('array')) {
      if (resultType.includes('number')) {
        if (value.includes(',')) typedValue = value.split(',').map((el) => parseFloat(el))
        else if (value.includes(' ')) typedValue = value.split(' ').map((el) => parseFloat(el))
      }

      if (resultType.includes('string')) {
        if (value.includes(',')) typedValue = value.split(',').map((el) => el)
        else if (value.includes(' ')) typedValue = value.split(' ').map((el) => el)
      }
    }
    if (resultType === 'number') typedValue = parseFloat(value)

    setState((prev) => {
      setNestedValue(
        prev,
        [dataset?.path ?? '', name].filter((e) => e.length !== 0),
        typedValue,
      )

      return {
        ...prev,
      }
    })
  }

  return { onChange }
}

/**
 * This function sets the value of the nested property in the object to a given value
 * @param object The object in whch the properties-tree should exist
 * @param properties The property tree inside the object
 * @param value The value which shall be set to the nested property
 */
export function setNestedValue(object: any, properties: Array<string>, value: any) {
  properties.reduce((obj, prop, index) => {
    if (!obj) return undefined
    if (!obj.hasOwnProperty(prop)) return undefined

    if (index === properties.length - 1) {
      // set the value of the lowester node of the nested object tree
      obj[prop] = value
    }

    return obj[prop]
  }, object)
}
