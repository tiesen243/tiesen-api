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
        padding: '0 0 0 1rem',
      }}
    >
      {themes.map((theme) => (
        <li key={theme} style={{ width: '100%' }}>
          <p>{theme}</p>

          <Image
            src={`https://api.tiesen.id.vn/api/view-count/demo?theme=${theme}`}
            alt={theme}
            width={1050}
            height={350}
            style={{ width: '100%', height: 'auto' }}
          />
        </li>
      ))}

      <li>
        <b>Note: </b>theme=&quot;no&quot; for return a number of views
      </li>
    </ul>
  </article>
)

export default Page
