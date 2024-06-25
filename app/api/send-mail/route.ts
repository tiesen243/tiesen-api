import { type NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { ZodError, z } from 'zod'

import EmailTemplate from '@/emails/template'

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
  from: z.string(),
  to: z.string().email({ message: 'Email is not valid' }),
  reply_to: z.string().email({ message: 'Email is not valid' }),
  subject: z.string().min(4, { message: 'Subject must be at least 4 characters' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
  api_key: z.string(),
})

export const POST = async (req: NextRequest) => {
  try {
    const parsed = schema.parse(await req.json())

    if (parsed.api_key !== process.env.API_KEY)
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })

    const { data, error } = await resend.emails.send({
      from: `${parsed.from} <${process.env.DOMAIN}>`,
      to: parsed.to,
      reply_to: parsed.reply_to,
      subject: parsed.subject,
      text: parsed.message,
      react: EmailTemplate(parsed),
    })

    if (error)
      return NextResponse.json(
        { message: 'Error sending email', error: error.message },
        { status: 500 },
      )

    return NextResponse.json({ message: 'Email sent', data: data })
  } catch (e) {
    if (e instanceof ZodError)
      return NextResponse.json(
        { message: 'Validation error', error: e.flatten().fieldErrors },
        { status: 400 },
      )
    if (e instanceof Error)
      return NextResponse.json({ message: 'Error', error: e.message }, { status: 500 })
  }
}
