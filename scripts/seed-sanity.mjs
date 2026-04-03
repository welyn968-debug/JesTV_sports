import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

const envLocalPath = resolve(process.cwd(), '.env.local')
const envPath = resolve(process.cwd(), '.env')

if (existsSync(envLocalPath)) {
  config({ path: envLocalPath })
} else if (existsSync(envPath)) {
  config({ path: envPath })
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset || !token) {
  // eslint-disable-next-line no-console
  console.error('Missing SANITY env vars. Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN.')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-02-01',
  useCdn: false,
  token,
})

const slugify = (input) =>
  input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

const categories = [
  { title: 'Match Reports', description: 'Full-time reports from KPL and international fixtures', color: '#E8000D' },
  { title: 'Transfers', description: 'Breaking news on player movements and transfer market updates', color: '#FF6B00' },
  { title: 'Opinion', description: 'Expert perspectives, debates and commentary', color: '#7B2FBE' },
  { title: 'Interviews', description: 'Exclusive interviews with players, coaches and officials', color: '#0066CC' },
  { title: 'Fixtures', description: 'Upcoming match schedules for KPL and global competitions', color: '#00875A' },
  { title: 'Analysis', description: 'Tactical breakdowns and data-driven insights', color: '#334155' },
]

const authors = [
  { name: 'James Ochieng', bio: 'KPL and match analysis expert. 10+ years covering Kenyan football.' },
  { name: 'Amina Said', bio: 'Transfers and tactical analysis. East African football correspondent.' },
  { name: 'Kevin Mwangi', bio: 'Harambee Stars and African football coverage. Based in Nairobi.' },
]

const articles = [
  {
    title: 'Manchester City Dominates Europa: Season Analysis',
    excerpt: "Breaking down how Guardiola's tactical innovations secured another championship.",
    category: 'Analysis',
    author: 'James Ochieng',
  },
  {
    title: 'Rising Stars: Young Talents Reshaping Football',
    excerpt: 'Discover the emerging players who are poised to dominate the next decade.',
    category: 'Analysis',
    author: 'Amina Said',
  },
  {
    title: 'Transfer Market Predictions: Summer 2026',
    excerpt: 'Expert predictions on the biggest moves happening this summer transfer window.',
    category: 'Transfers',
    author: 'Amina Said',
  },
  {
    title: "Liverpool's New Era: Tactics Under New Leadership",
    excerpt: 'How Liverpool is adapting to a fresh tactical approach this season.',
    category: 'Analysis',
    author: 'Kevin Mwangi',
  },
  {
    title: 'Gor Mahia Clinch KPL Title With Stunning 3-0 Win',
    excerpt: 'Gor Mahia secured the league title in dramatic fashion against AFC Leopards.',
    category: 'Match Reports',
    author: 'James Ochieng',
  },
]

const categoryMap = new Map()
for (const cat of categories) {
  const slug = slugify(cat.title)
  const doc = await client.createIfNotExists({
    _id: `category-${slug}`,
    _type: 'category',
    title: cat.title,
    slug: { _type: 'slug', current: slug },
    description: cat.description,
    color: cat.color,
  })
  categoryMap.set(cat.title, doc._id)
}

const authorMap = new Map()
for (const author of authors) {
  const slug = slugify(author.name)
  const doc = await client.createIfNotExists({
    _id: `author-${slug}`,
    _type: 'author',
    name: author.name,
    slug: { _type: 'slug', current: slug },
    bio: author.bio,
  })
  authorMap.set(author.name, doc._id)
}

for (const article of articles) {
  const slug = slugify(article.title)
  const existing = await client.fetch(
    `*[_type == "article" && slug.current == $slug][0]{ _id }`,
    { slug }
  )
  if (existing?._id) continue

  const body = [
    {
      _type: 'block',
      _key: crypto.randomUUID(),
      children: [
        {
          _type: 'span',
          _key: crypto.randomUUID(),
          text: article.excerpt,
          marks: [],
        },
      ],
      markDefs: [],
      style: 'normal',
    },
  ]

  await client.create({
    _type: 'article',
    title: article.title,
    slug: { _type: 'slug', current: slug },
    excerpt: article.excerpt,
    body,
    category: { _type: 'reference', _ref: categoryMap.get(article.category) },
    author: { _type: 'reference', _ref: authorMap.get(article.author) },
    publishedAt: new Date().toISOString(),
  })
}

// eslint-disable-next-line no-console
console.log('Sanity seed complete')
