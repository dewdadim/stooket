import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  req.nextUrl.searchParams.get('')
}
