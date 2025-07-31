import { prisma } from '@/lib/database'
import { auth } from '@clerk/nextjs/server'
import { put } from '@vercel/blob'
import { randomUUID } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.formData()
    const file: File | null = data.get('avatar') as unknown as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      )
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large (max 5MB)' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename
    const fileExtension = file.name.split('.').pop() || 'jpg'
    const filename = `avatars/${randomUUID()}.${fileExtension}`

    // Upload to Vercel Blob storage
    const blob = await put(filename, buffer, {
      access: 'public',
      addRandomSuffix: false,
    })

    // Update user's imageUrl in database
    const imageUrl = blob.url

    await prisma.user.update({
      where: { clerkId: userId },
      data: { imageUrl },
    })

    return NextResponse.json({
      imageUrl,
      message: 'Avatar uploaded successfully',
    })
  } catch (error) {
    console.error('Error uploading avatar:', error)
    return NextResponse.json(
      { error: 'Failed to upload avatar' },
      { status: 500 }
    )
  }
}
