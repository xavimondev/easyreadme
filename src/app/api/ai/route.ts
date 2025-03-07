import { NextResponse } from 'next/server'

import { AIProvider, SchemaTypes, Section } from '@/types/ai'

import {
  MONOREPO_SUMMARY_SCHEMA,
  PROJECT_SUMMARY_SCHEMA,
  SETTING_UP_ENV_VARS_SCHEMA,
  TECH_STACK_SCHEMA
} from '@/utils/ai-schemas'
import {
  generateCompletion,
  generateCompletionWithSchema,
  getAIModel,
  handleGenerationErrors
} from '@/utils/prod-generation'

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const { prompt, providerAISelected, section } = (await req.json()) as {
      prompt: string
      providerAISelected: AIProvider | undefined
      section: Section | undefined
    }

    const aiModel = getAIModel({ provider: providerAISelected })
    if (!aiModel) {
      return NextResponse.json({ error: 'Missing API_KEY – make sure to add it.' })
    }

    // If no section is selected, generate a string completion
    if (!section) {
      const completion = await generateCompletion({
        model: aiModel,
        prompt
      })

      return NextResponse.json({ data: completion, error: undefined })
    }

    const schemas: Record<Section, SchemaTypes> = {
      'project-summary': PROJECT_SUMMARY_SCHEMA,
      'tech-stack': TECH_STACK_SCHEMA,
      'setting-up': SETTING_UP_ENV_VARS_SCHEMA,
      'monorepo-summary': MONOREPO_SUMMARY_SCHEMA
    }

    const schema = schemas[section]

    const completion = await generateCompletionWithSchema({
      model: aiModel,
      prompt,
      schema
    })
    const data = { data: completion }

    return NextResponse.json({ data, error: undefined })
  } catch (error) {
    // console.log(error)
    const res = handleGenerationErrors({ error })
    const { errorData, status } = res
    return NextResponse.json(errorData, status)
  }
}
