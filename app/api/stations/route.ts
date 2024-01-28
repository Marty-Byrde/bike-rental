import { getStations } from '@/lib/station/StationDAO'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const stations = await getStations()
  return NextResponse.json(stations)
}
