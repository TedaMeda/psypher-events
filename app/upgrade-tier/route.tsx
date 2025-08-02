import { createClerkClient } from '@clerk/backend'
import { NextResponse } from 'next/server'

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY! })

export async function POST(req: Request) {
  const body = await req.json()
  const { userId, targetTier } = body
  
  try {
    await clerk.users.updateUser(userId, {
      publicMetadata: { tier: targetTier }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Upgrade failed' }, { status: 500 })
  }
}
