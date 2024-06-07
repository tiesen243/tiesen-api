import { ImageResponse } from 'next/og'
import { NextResponse, type NextRequest } from 'next/server'

import { getBaseUrl } from '@/app/utils'
import { db } from '@/prisma'

interface Context {
  params: { slug: string }
}

const imageUrl = getBaseUrl() + '/theme'

export const GET = async (req: NextRequest, { params: { slug } }: Context) => {
  const theme = req.nextUrl.searchParams.get('theme') ?? 'gelbooru'

  // Check if theme not existed in the list
  if (
    !['asoul', 'gelbooru', 'gelbooru-h', 'moebooru', 'moebooru-h', 'rule34', 'no'].includes(theme)
  )
    return NextResponse.json({ error: 'Theme not found' }, { status: 404 })

  const isExisted = await db.view.findUnique({ where: { slug } })
  if (!isExisted) await db.view.create({ data: { slug } })
  else
    await db.view.update({
      where: { slug },
      data: { count: { increment: 1 } },
    })

  // Get the view count
  const view = await db.view.findUnique({ where: { slug } })
  const count = String(view?.count ?? '0')
    .padStart(7, '0')
    .split('')

  if (theme === 'no') return NextResponse.json(view?.count ?? '0')

  const ext = theme.endsWith('-h') ? 'png' : 'gif'
  return new ImageResponse(
    (
      <div tw="w-full h-full flex justify-center items-center px-2">
        {count.map((c, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={`${imageUrl}/${theme}/${c}.${ext}`} alt={c} tw="w-36 h-72" />
        ))}
      </div>
    ),
    {
      width: 1050,
      height: 350,
      headers: {
        'Cache-Control':
          slug === 'demo' ? 'max-age=31536000' : 'max-age=0, no-cache, no-store, must-revalidate',
      },
    },
  )
}
