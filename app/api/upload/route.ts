import { NextResponse } from 'next/server'
import { writeClient } from '@/lib/sanity/client'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 })
    }

    const asset = await writeClient.assets.upload('image', file, {
      filename: file.name,
    })

    return NextResponse.json({
      assetId: asset._id,
      url: asset.url,
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
      },
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
