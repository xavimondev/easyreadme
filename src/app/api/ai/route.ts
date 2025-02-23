import { NextResponse } from 'next/server'

import { AIProvider } from '@/types/ai'

import { generateCompletion, getAIModel, handleGenerationErrors } from '@/utils/prod-generation'

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const { format, prompt, providerAISelected } = (await req.json()) as {
      format: string
      prompt: string
      providerAISelected: AIProvider | undefined
    }

    // console.log({ format, prompt, providerAISelected })
    const aiModel = getAIModel({ provider: providerAISelected })
    if (!aiModel) {
      return NextResponse.json({ error: 'Missing API_KEY – make sure to add it.' })
    }

    const data = await generateCompletion({
      model: aiModel,
      prompt,
      format
    })

    return NextResponse.json({ data, error: undefined })
  } catch (error) {
    console.log(error)
    const res = handleGenerationErrors({ error })
    const { errorData, status } = res
    return NextResponse.json(errorData, status)
  }
}
