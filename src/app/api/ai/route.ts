import { NextResponse } from 'next/server'

import { AIProvider } from '@/types/ai'

import { generateCompletionLocal } from '@/utils/local-generation'
import {
  generateCompletionMistral,
  generateCompletionMistralCloud,
  generateCompletionOpenAi,
  handleGenerationErrors
} from '@/utils/prod-generation'

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const { format, prompt, providerAISelected } = (await req.json()) as {
      format: string
      prompt: string
      providerAISelected: AIProvider | undefined
    }
    let data = undefined
    if (process.env.NODE_ENV === 'development') {
      data = await generateCompletionLocal({
        model: 'llama2:latest',
        prompt,
        format
      })
    } else {
      // console.log('providerAISelected', providerAISelected)
      if (providerAISelected === undefined) {
        data = await generateCompletionMistralCloud({
          prompt,
          format
        })
        return NextResponse.json({ data, error: undefined })
      }

      if (providerAISelected === 'OpenAI') {
        data = await generateCompletionOpenAi({
          prompt,
          format
        })
      } else {
        data = await generateCompletionMistral({
          prompt,
          format
        })
      }
      if (!data) {
        return NextResponse.json({ error: 'Missing API_KEY – make sure to add it.' })
      }
      // console.log(data)
    }
    return NextResponse.json({ data, error: undefined })
  } catch (error) {
    console.log(error)
    const res = handleGenerationErrors({ error })
    const { errorData, status } = res
    return NextResponse.json(errorData, status)
  }
}
