import { defineField, defineType } from 'sanity'

export const pteImage = defineType({
  name: 'pteImage',
  title: 'Image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'caption', media: 'image' },
    prepare({ title, media }) {
      return {
        title: title || 'Image',
        media,
      }
    },
  },
})
