import imageUrlBuilder from '@sanity/image-url'
import { publicClient } from './client'

const builder = imageUrlBuilder(publicClient)

export function urlFor(source: any) {
  return builder.image(source)
}
