import { type NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { ZodError, z } from 'zod'

import EmailTemplate from './_email-template'

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
  from: z.string(),
  to: z.string().email({ message: 'Email is not valid' }),
  reply_to: z.string().email({ message: 'Email is not valid' }),
  subject: z.string().min(4, { message: 'Subject must be at least 4 characters' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
})

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()
    const validData = await schema.parseAsync(body)

    const { data, error } = await resend.emails.send({
      from: `${validData.from} <${process.env.DOMAIN}>`,
      to: validData.to,
      reply_to: validData.reply_to,
      subject: validData.subject,
      text: validData.message,
      react: <EmailTemplate {...validData} />,
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
