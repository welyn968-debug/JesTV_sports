import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = '2026-02-01'

if (!projectId || !dataset) {
  // eslint-disable-next-line no-console
  console.warn('Sanity project env vars are missing. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.')
}

export const publicClient = createClient({
  projectId: projectId || '',
  dataset: dataset || '',
  apiVersion,
  useCdn: true,
})

export const writeClient = createClient({
  projectId: projectId || '',
  dataset: dataset || '',
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export const sanityConfig = {
  projectId: projectId || '',
  dataset: dataset || '',
  apiVersion,
}
