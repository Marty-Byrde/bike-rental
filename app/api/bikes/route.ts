import { NextResponse } from 'next/server'
import { getBikes } from '@/lib/bikes/BikesDAO'

export async function GET(req: Request) {
  const bikes = await getBikes()
  return NextResponse.json(bikes)
}
