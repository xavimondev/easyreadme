import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { Ratelimit } from '@upstash/ratelimit'
import { RATE_LIMIT } from '@/constants'

export async function POST(req: Request) {
  try {
    if (
      process.env.NODE_ENV !== 'development' &&
      process.env.KV_REST_API_URL &&
      process.env.KV_REST_API_TOKEN
    ) {
      const ip = req.headers.get('x-forwarded-for')
      const ratelimit = new Ratelimit({
        redis: kv,
        // rate limit to 10 templates per day
        limiter: Ratelimit.slidingWindow(RATE_LIMIT, '1 d')
      })

      const { success, limit, reset, remaining } = await ratelimit.limit(`ratelimit_${ip}`)

      if (!success) {
        return NextResponse.json(
          {
            msg: 'You have reached your request limit for the day.'
          },
          {
            status: 429,
            headers: {
              'X-RateLimit-Limit': limit.toString(),
              'X-RateLimit-Remaining': remaining.toString(),
              'X-RateLimit-Reset': reset.toString()
            }
          }
        )
      }
    }

    return NextResponse.json({ msg: '' })
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
