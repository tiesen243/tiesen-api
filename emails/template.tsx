import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Markdown,
  Preview,
  Section,
  Tailwind,
  Text,
  type TailwindConfig,
} from '@react-email/components'

interface EmailProps {
  from: string
  reply_to: string
  subject: string
  message: string
}

const config: TailwindConfig = {
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    colors: {
      background: 'hsl(240 10% 3.9%)',
      foreground: 'hsl(0 0% 98%)',
      border: 'hsl(240 3.7% 15.9%)',
    },
  },
}

export const EmailTemplate: React.FC<Readonly<EmailProps>> = (props) => {
  const previewText = `Message from ${props.reply_to} on ${props.from}`

  return (
    <Html lang="en">
      <Head />
      <Preview>{previewText}</Preview>

      <Tailwind config={config}>
        <Body className="bg-background text-foreground border-border font-sans antialiased">
          <Container className="mx-auto px-2">
            <Section>
              <Img
                src="https://raw.githubusercontent.com/tiesen243/portfolio/main/public/android-chrome-512x512.png"
                alt="logo"
                className="w-16 h-16 mx-auto my-4"
              />
              <Heading>{props.subject}</Heading>
            </Section>

            <Markdown
              markdownCustomStyles={{
                h1: { marginTop: 2, marginBottom: 2 },
                h2: { marginTop: 2, marginBottom: 2 },
                h3: { marginTop: 2, marginBottom: 2 },
                h4: { marginTop: 2, marginBottom: 2 },
              }}
            >
              {props.message}
            </Markdown>

            <hr className="border-border" />

            <Section>
              <Img
                src="https://raw.githubusercontent.com/tiesen243/portfolio/main/public/imgs/tiesen.png"
                alt="Tiesen"
                className="w-52 h-auto my-4"
              />

              <Text>
                Website: <Link href="https://tiesen.id.vn/">https://tiesen.id.vn</Link>
              </Text>

              <Text>Best Regards,</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default EmailTemplate
