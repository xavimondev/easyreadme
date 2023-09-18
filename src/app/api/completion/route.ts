import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === '') {
      return new Response('Missing OPENAI_API_KEY – make sure to add it to your .env file.', {
        status: 400
      })
    }
    const { prompt } = await req.json()
    console.log(prompt)
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
