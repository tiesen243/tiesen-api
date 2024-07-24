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

const mock = {
  from: 'Tiesen',
  reply_to: 'ttien56906@gmail.com',
  subject: 'Hello, World!',
  message: `# Hello, World!`,
}

export const EmailTemplate: React.FC<Readonly<EmailProps>> = (props) => {
  const data = process.env.NODE_ENV === 'production' ? props : mock
  const previewText = `Message from ${data.reply_to} on ${data.from}`

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
              <Heading className="text-center">{data.subject}</Heading>
            </Section>

            <Markdown
              markdownCustomStyles={{
                h1: { marginTop: 2, marginBottom: 2 },
                h2: { marginTop: 2, marginBottom: 2 },
                h3: { marginTop: 2, marginBottom: 2 },
                h4: { marginTop: 2, marginBottom: 2 },
              }}
              markdownContainerStyles={{
                background: 'hsl(240 10% 3.9%)',
                color: 'hsl(0 0% 98%)',
              }}
            >
              {data.message}
            </Markdown>

            <Text>
              Best Regards, <br />
              {data.from}
            </Text>

            <hr className="border-border" />
            <Section>
              <Text>
                Website: <Link href="https://tiesen.id.vn/">https://tiesen.id.vn</Link>
                <br />
                Email: <Link href={`mailto:${mock.reply_to}`}>{mock.reply_to}</Link>
                <br />
                Address: Saigon, Vietnam
              </Text>

              <Img
                src="https://raw.githubusercontent.com/tiesen243/portfolio/main/public/imgs/tiesen.png"
                alt="Tiesen"
                className="w-52 h-auto my-4"
              />
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default EmailTemplate
