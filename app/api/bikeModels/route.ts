import { NextResponse } from 'next/server'
import { getBikeModels } from '@/lib/bikes/BikeModelsDAO'

export async function GET(req: Request) {
  const bikes = await getBikeModels()
  return NextResponse.json(bikes)
}
