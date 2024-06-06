import { db } from '@/prisma'
import { type NextRequest, NextResponse } from 'next/server'

import { z } from 'zod'

const schema = z.object({
  slug: z.string(),
  key: z.string(),
})

export const POST = async (req: NextRequest) => {
  const body = await req.json()
  const parsed = schema.parse(body)
  if (parsed.key !== process.env.API_KEY)
    return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })

  try {
    await db.view.delete({ where: { slug: parsed.slug } })
    return NextResponse.json({ slug: parsed.slug }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: 'Slug not found' }, { status: 404 })
  }
}
