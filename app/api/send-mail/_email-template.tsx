import * as components from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'

interface Props {
  from: string
  reply_to: string
  subject: string
  message: string
}

const EmailTemplate: React.FC<Props> = (props) => {
  const previewText = `Message from ${props.reply_to} on ${props.from}`

  return (
    <components.Html>
      <components.Head />
      <components.Preview>{previewText}</components.Preview>
      <Tailwind>
        <components.Body className="bg-white font-sans">
          <components.Container className="flex flex-col gap-4 rounded my-10 w-full p-4">
            <components.Heading className="text-black text-center text-4xl text-pretty font-bold">
              {props.subject}
            </components.Heading>

            <components.Hr className="w-full" />

            <components.Text
              className="text-gray-700 text-md text-balance"
              dangerouslySetInnerHTML={{ __html: props.message }}
            />
          </components.Container>
        </components.Body>
      </Tailwind>
    </components.Html>
  )
}

export default EmailTemplate
