import { groq } from 'next-sanity'

export const ARTICLES_QUERY = groq`
  *[_type == "article" && defined(slug.current)]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    publishedAt,
    body,
    "category": category->{ title, "slug": slug.current, color },
    "author": author->{ name, "slug": slug.current, photo, supabaseUserId }
  }
`

export const ARTICLE_QUERY = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    publishedAt,
    seoTitle,
    seoDescription,
    body[]{
      ...,
      _type == "pteImage" => {
        ...,
        "imageUrl": image.asset->url
      }
    },
    "category": category->{ title, "slug": slug.current, color },
    "author": author->{ name, "slug": slug.current, photo, bio, twitter, instagram, supabaseUserId }
  }
`

export const CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    color,
    "articleCount": count(*[_type == "article" && references(^._id)])
  }
`

export const CATEGORY_ARTICLES_QUERY = groq`
  *[_type == "category" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    description,
    color,
    "articles": *[_type == "article" && category._ref == ^._id]
      | order(publishedAt desc){
        _id,
        title,
        "slug": slug.current,
        excerpt,
        mainImage,
        publishedAt,
        "category": category->{ title, "slug": slug.current, color },
        "author": author->{ name, "slug": slug.current, photo }
      }
  }
`

export const AUTHORS_QUERY = groq`
  *[_type == "author"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    photo,
    bio,
    "articles": count(*[_type == "article" && references(^._id)])
  }
`
