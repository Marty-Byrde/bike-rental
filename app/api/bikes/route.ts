import { NextResponse } from 'next/server'
import { getBikes } from '@/lib/bikes/BikeDAO'

export async function GET(req: Request) {
  const bikes = await getBikes()
  return NextResponse.json(bikes)
}
