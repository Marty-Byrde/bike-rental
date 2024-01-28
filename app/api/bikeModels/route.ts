import { getBikeModels } from '@/lib/bikes/BikeModelsDAO'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const bikes = await getBikeModels()
  return NextResponse.json(bikes)
}
