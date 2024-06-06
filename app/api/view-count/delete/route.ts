import { db } from '@/prisma'
import { type NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const slug = String(req.nextUrl.searchParams.get('slug'))
  const key = String(req.nextUrl.searchParams.get('key'))

  if (key !== process.env.API_KEY)
    return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })

  try {
    await db.view.delete({ where: { slug } })
    return NextResponse.json({ slug }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: 'Slug not found' }, { status: 404 })
  }
}
