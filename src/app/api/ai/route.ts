import { NextResponse } from 'next/server'
import OpenAI from 'openai'

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

    const { format, prompt } = await req.json()
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a tech lead.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.5,
      frequency_penalty: 0,
      presence_penalty: 0,
      n: 1
      // max_tokens: 500 -> this will change later
    })
    const content = completion.choices[0].message.content
    const data = format === 'json' ? JSON.parse(content || '{}') : content
    return NextResponse.json({ data })
  } catch (error) {
    // Check if the error is an APIError
    if (error instanceof OpenAI.APIError) {
      console.error(error.message)
      const errorMessage = 'An error has ocurred with API Completions. Please try again.'
      const { name, status, headers } = error
      return NextResponse.json({ name, status, headers, message: errorMessage }, { status })
    } else {
      throw error
    }
  }
}
