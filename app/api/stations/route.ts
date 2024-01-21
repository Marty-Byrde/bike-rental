import { getStations } from '@/lib/station/StationDAO'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const stations = await getStations()
  return NextResponse.json(stations)
}
