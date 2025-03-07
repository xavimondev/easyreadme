import { cookies } from 'next/headers'
import { createMistral, MistralProvider, mistral as originalMistral } from '@ai-sdk/mistral'
import { createOpenAI, OpenAIProvider } from '@ai-sdk/openai'
import { customProvider, generateObject, generateText, LanguageModelV1 } from 'ai'

import { AIProvider } from '@/types/ai'

import { COOKIE_NAME } from '@/constants'

export function getAIModel({ provider }: { provider: AIProvider | undefined }) {
  let defaultProvider: MistralProvider | OpenAIProvider = originalMistral
  let defaultModel = 'mistral-small-latest'

  if (provider) {
    const userEnteredApiKey = cookies().get(COOKIE_NAME)?.value
    if (!userEnteredApiKey || userEnteredApiKey.trim().length === 0) return

    if (provider === 'Mistral') {
      defaultProvider = createMistral({
        apiKey: userEnteredApiKey
      })
    } else {
      defaultProvider = createOpenAI({
        apiKey: userEnteredApiKey
      })
      defaultModel = 'openai-gpt4'
    }
  }

  const customModel = customProvider({
    languageModels: {
      'mistral-small-latest': defaultProvider('mistral-small-latest'),
      'openai-gpt4': defaultProvider('gpt-4o')
    },
    fallbackProvider: originalMistral
  })

  return customModel.languageModel(defaultModel)
}

export const generateCompletion = async ({
  model,
  prompt
}: {
  model: LanguageModelV1
  prompt: string
}) => {
  const { text } = await generateText({
    model,
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
    temperature: 0.7,
    maxTokens: 1024
  })

  return text
}

export const generateCompletionWithSchema = async ({
  model,
  prompt,
  schema
}: {
  model: LanguageModelV1
  prompt: string
  schema: any
}) => {
  const { object } = await generateObject({
    model,
    schema,
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
    temperature: 0.7,
    maxTokens: 1024
  })

  // @ts-expect-error
  const data = object.data
  return data
}

export const handleGenerationErrors = ({ error }: { error: unknown }) => {
  let errorMessage = 'An error has ocurred with API Completions. Please try again.'
  // @ts-ignore
  if (error.status === 401) {
    errorMessage = 'Incorrect API Key provided. Please enter a new one.'
  }
  // @ts-ignore
  const { name, status, headers } = error
  return {
    errorData: { name, status, headers, error: errorMessage, data: undefined },
    status: { status }
  }
}
