import { PortableText } from '@portabletext/react'
import type { PortableTextComponents } from '@portabletext/react'
import { urlFor } from '@/lib/sanity/image'

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-display" style={{ fontSize: '30px', color: '#0A0A0A', letterSpacing: '0.02em', margin: '32px 0 14px' }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display" style={{ fontSize: '24px', color: '#0A0A0A', letterSpacing: '0.02em', margin: '24px 0 12px' }}>
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p style={{ marginBottom: '20px' }}>{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote style={{ borderLeft: '4px solid #E8000D', paddingLeft: '16px', color: '#555', margin: '20px 0' }}>
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href as string
      const openInNewTab = value?.openInNewTab
      const rel = openInNewTab ? 'noopener noreferrer' : undefined
      const target = openInNewTab ? '_blank' : undefined
      return (
        <a href={href} rel={rel} target={target} style={{ color: '#0066CC', textDecoration: 'underline' }}>
          {children}
        </a>
      )
    },
  },
  types: {
    pteImage: ({ value }) => {
      if (!value?.image) return null
      const src = urlFor(value.image).width(1200).quality(80).url()
      return (
        <figure style={{ margin: '28px 0' }}>
          <img src={src} alt={value.alt || ''} style={{ width: '100%', borderRadius: 6 }} />
          {value.caption && (
            <figcaption style={{ fontSize: '12px', color: '#666', marginTop: 8 }}>{value.caption}</figcaption>
          )}
        </figure>
      )
    },
  },
}

export function PortableTextRenderer({ value }: { value: any }) {
  if (!value) return null
  return <PortableText value={value} components={components} />
}
