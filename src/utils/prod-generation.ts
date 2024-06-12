import { cookies } from 'next/headers'
import { createMistral, mistral } from '@ai-sdk/mistral'
import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'

import { COOKIE_NAME } from '@/constants'

export const generateCompletionOpenAi = async ({
  prompt,
  format
}: {
  prompt: string
  format: string
}) => {
  const userEnteredApiKey = cookies().get(COOKIE_NAME)?.value
  if (!userEnteredApiKey || userEnteredApiKey.trim().length === 0) return

  const openai = createOpenAI({
    compatibility: 'strict',
    apiKey: userEnteredApiKey
  })

  const { text } = await generateText({
    model: openai.completion('gpt-3.5-turbo-instruct'),
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

  const content = text
  const data = format === 'json' ? JSON.parse(content || '{}') : content
  return data
}

export const generateCompletionMistral = async ({
  prompt,
  format
}: {
  prompt: string
  format: string
}) => {
  const userEnteredApiKey = cookies().get(COOKIE_NAME)?.value
  if (!userEnteredApiKey || userEnteredApiKey.trim().length === 0) return

  const mistral = createMistral({
    apiKey: userEnteredApiKey
  })

  const { text } = await generateText({
    model: mistral('open-mixtral-8x7b'),
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

  console.log(text)
  const content = text
  const data = format === 'json' ? JSON.parse(content || '{}') : content
  return data
}

export const generateCompletionMistralCloud = async ({
  prompt,
  format
}: {
  prompt: string
  format: string
}) => {
  const { text } = await generateText({
    model: mistral('open-mixtral-8x7b'),
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

  const content = text
  const data = format === 'json' ? JSON.parse(content || '{}') : content
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
