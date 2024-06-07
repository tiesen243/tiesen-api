import type { NextPage } from 'next'
import Image from 'next/image'

const themes = ['asoul', 'gelbooru', 'gelbooru-h', 'moebooru', 'moebooru-h', 'rule34']

const Page: NextPage = () => (
  <article
    style={{
      maxWidth: '768px',
      margin: '0 auto',
      padding: '0 2rem',
    }}
  >
    <h1>How to use</h1>

    <h2>Svg</h2>
    <code
      style={{
        backgroundColor: 'hsl(240 3.7% 15.9%)',
        display: 'block',
        padding: '1rem',
        borderRadius: '0.5rem',
        margin: '0.5rem 0',
        width: 'fit-content',
      }}
    >
      https://api.tiesen.com/api/view-count/:slug?theme=:theme
    </code>

    <h2>Markdown</h2>
    <code
      style={{
        backgroundColor: 'hsl(240 3.7% 15.9%)',
        display: 'block',
        padding: '1rem',
        borderRadius: '0.5rem',
        margin: '0.5rem 0',
        width: 'fit-content',
      }}
    >
      ![view-count](https://api.tiesen.com/api/view-count/:slug?theme=:theme)
    </code>

    <h2>Theme</h2>

    <ul
      style={{
        listStyle: 'none',
        fontWeight: 500,
      }}
    >
      {themes.map((theme) => (
        <li key={theme}>
          <p>{theme}</p>

          <Image
            src={`https://api.tiesen.com/api/view-count/tiesen243?theme=${theme}`}
            alt={theme}
            width={1050}
            height={350}
          />
        </li>
      ))}
    </ul>
  </article>
)

export default Page
