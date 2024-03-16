import { NextResponse } from 'next/server'

import { generateCompletionLocal } from '@/utils/local-generation'
import { generateCompletionOpenAi, handleGenerationErrors } from '@/utils/prod-generation'

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const { format, prompt } = await req.json()
    let data = undefined
    if (process.env.NODE_ENV === 'development') {
      data = await generateCompletionLocal({
        model: 'llama2:latest',
        prompt,
        format
      })
    } else {
      if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === '') {
        return NextResponse.json(
          {
            data: undefined,
            error: 'Missing OPENAI_API_KEY – make sure to add it to your .env file.'
          },
          { status: 400 }
        )
      }

      data = await generateCompletionOpenAi({
        model: 'gpt-3.5-turbo',
        prompt,
        format
      })
    }
    return NextResponse.json({ data, error: undefined })
  } catch (error) {
    const res = handleGenerationErrors({ error })
    const { errorData, status } = res
    return NextResponse.json(errorData, status)
  }
}
