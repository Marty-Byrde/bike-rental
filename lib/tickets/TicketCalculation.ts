import { Bike, BikeBreakType, BikeCategory } from '@/typings/Bike'

export default function calculateTicket(bike: Bike, start: Date, end: Date): number {
  const price = parseFloat(((10 + getHoursRented(start, end) * 5) * getModelFactor(bike.model.category) * getBreaksFactor(bike.model.brakeType)).toFixed(2))

  return +price.toFixed(2)
}

function getModelFactor(model: BikeCategory['name']) {
  switch (model) {
    case 'Children':
      return 1.05
    case 'City':
      return 1.1
    case 'Mountain':
      return 1.2
    case 'Electric':
      return 1.4
  }
}

function getHoursRented(start: Date, end: Date) {
  return Math.abs(start.getTime() - end.getTime()) / 36e5
}

function getBreaksFactor(breaks: BikeBreakType['name']) {
  switch (breaks) {
    case 'Frame':
      return 1.02
    case 'Disc':
      return 1.05
  }
}
