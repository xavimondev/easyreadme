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
      const windowDuration = 24 * 60 * 60 * 1000
      const bucket = Math.floor(Date.now() / windowDuration)

      const valueRate = await kv.get(`@upstash/ratelimit:ratelimit_${ip}:${bucket}`)
      const usedGenerations = valueRate || 0
      const remainingGenerations = RATE_LIMIT - Number(usedGenerations)
      return NextResponse.json({ remaining: remainingGenerations })
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
