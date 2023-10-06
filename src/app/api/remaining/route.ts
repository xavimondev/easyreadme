import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { RATE_LIMIT } from '@/constants'

export async function GET(req: Request) {
  try {
    if (
      process.env.NODE_ENV !== 'development' &&
      process.env.KV_REST_API_URL &&
      process.env.KV_REST_API_TOKEN
    ) {
      const ip = req.headers.get('x-forwarded-for')
      const remaining = await kv.get(`ratelimit_${ip}`)
      return NextResponse.json({ remaining: remaining ?? 0 })
    }
    return NextResponse.json({ remaining: RATE_LIMIT })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        msg: 'An error has ocurred'
      },
      {
        status: 500
      }
    )
  }
}
