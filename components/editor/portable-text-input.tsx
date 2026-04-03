'use client'

import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react'
import {
  PortableTextEditor,
  PortableTextEditable,
  type EditorChange,
  keyGenerator,
} from '@sanity/portable-text-editor'
import type { PortableTextBlock } from '@sanity/types'

export type PortableTextInputHandle = {
  insertImage: (value: { image: any; caption?: string; alt: string }) => void
  focus: () => void
}

type Props = {
  value: PortableTextBlock[]
  onChange: (value: PortableTextBlock[]) => void
}

export const PortableTextInput = forwardRef<PortableTextInputHandle, Props>(({ value, onChange }, ref) => {
  const editorRef = useRef<PortableTextEditor | null>(null)

  const schemaType = useMemo(
    () =>
      ({
        name: 'body',
        title: 'Body',
        type: 'array',
        of: [
          {
            type: 'block',
            styles: [
              { title: 'Normal', value: 'normal' },
              { title: 'H2', value: 'h2' },
              { title: 'H3', value: 'h3' },
              { title: 'Quote', value: 'blockquote' },
            ],
            lists: [{ title: 'Bullet', value: 'bullet' }],
            marks: {
              decorators: [
                { title: 'Strong', value: 'strong' },
                { title: 'Emphasis', value: 'em' },
                { title: 'Underline', value: 'underline' },
              ],
              annotations: [
                {
                  name: 'link',
                  type: 'object',
                  title: 'Link',
                  fields: [
                    { name: 'href', type: 'url', title: 'URL' },
                    { name: 'openInNewTab', type: 'boolean', title: 'Open in new tab' },
                  ],
                },
              ],
            },
          },
          {
            name: 'pteImage',
            title: 'Image',
            type: 'object',
            fields: [
              { name: 'image', type: 'image' },
              { name: 'caption', type: 'string' },
              { name: 'alt', type: 'string' },
            ],
          },
        ],
      }) as any,
    []
  )

  const pteImageType = useMemo(() => schemaType.of.find((t: any) => t.name === 'pteImage' || t.type === 'pteImage'), [schemaType])

  useImperativeHandle(
    ref,
    () => ({
      insertImage: (value) => {
        if (!editorRef.current || !pteImageType) return
        PortableTextEditor.insertBlock(editorRef.current, pteImageType, value)
      },
      focus: () => {
        if (!editorRef.current) return
        PortableTextEditor.focus(editorRef.current)
      },
    }),
    [pteImageType]
  )

  const handleChange = (change: EditorChange) => {
    if (change.type === 'value') {
      onChange(change.value || [])
      return
    }
    if (change.type === 'mutation' && change.snapshot) {
      onChange(change.snapshot)
    }
  }

  return (
    <div className="border border-border rounded-sm bg-background">
      <PortableTextEditor
        editorRef={editorRef}
        value={value}
        onChange={handleChange}
        schemaType={schemaType}
        keyGenerator={keyGenerator}
      >
        <PortableTextEditable
          className="min-h-[240px] px-4 py-3 text-sm leading-relaxed outline-none"
          style={{ fontFamily: 'var(--font-geist-mono), monospace' }}
        />
      </PortableTextEditor>
    </div>
  )
})

PortableTextInput.displayName = 'PortableTextInput'
