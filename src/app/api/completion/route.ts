import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { kv } from '@vercel/kv'
import { Ratelimit } from '@upstash/ratelimit'

export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === '') {
      return new Response('Missing OPENAI_API_KEY – make sure to add it to your .env file.', {
        status: 400
      })
    }

    if (
      process.env.NODE_ENV != 'development' &&
      process.env.KV_REST_API_URL &&
      process.env.KV_REST_API_TOKEN
    ) {
      const ip = req.headers.get('x-forwarded-for')
      const ratelimit = new Ratelimit({
        redis: kv,
        // rate limit to 15 requests per day
        limiter: Ratelimit.slidingWindow(15, '1 d')
      })

      const { success, limit, reset, remaining } = await ratelimit.limit(`ratelimit_${ip}`)

      if (!success) {
        return new Response('You have reached your request limit for the day.', {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString()
          }
        })
      }
    }
    const { prompt } = await req.json()
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [
        {
          role: 'system',
          content: 'You are a tech lead.'
        },
        {
          role: 'user',
          content: prompt
        }
      ]
    })
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response)

    // Respond with the stream
    return new StreamingTextResponse(stream)
  } catch (error) {
    // Check if the error is an APIError
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error
      return NextResponse.json({ name, status, headers, message }, { status })
    } else {
      throw error
    }
  }
}
