import { getBikes } from '@/lib/bikes/BikeDAO'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const bikes = await getBikes()
  return NextResponse.json(bikes)
}
