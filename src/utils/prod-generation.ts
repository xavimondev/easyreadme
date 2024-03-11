import { cookies } from 'next/headers'
import OpenAI from 'openai'

import { COOKIE_NAME } from '@/constants'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

export const generateCompletionOpenAi = async ({
  model,
  prompt,
  format
}: {
  model: string
  prompt: string
  format: string
}) => {
  const userEnteredApiKey = cookies().get(COOKIE_NAME)?.value
  if (userEnteredApiKey && userEnteredApiKey.trim().length > 0) {
    // Set user's api key
    openai.apiKey = userEnteredApiKey
  }

  const completion = await openai.chat.completions.create({
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
    frequency_penalty: 0,
    presence_penalty: 0,
    n: 1
    // max_tokens: 500 -> this will change later
  })
  const content = completion.choices[0].message.content
  const data = format === 'json' ? JSON.parse(content || '{}') : content
  return data
}

export const handleGenerationErrors = ({ error }: { error: unknown }) => {
  let errorMessage = 'An error has ocurred with API Completions. Please try again.'
  // Check if the error is an APIError
  if (error instanceof OpenAI.APIError) {
    if (error.status === 401) {
      errorMessage = 'Incorrect API Key provided. Please enter a new one.'
    }
    const { name, status, headers } = error
    return {
      errorData: { name, status, headers, message: errorMessage },
      status: { status }
    }
  }

  return {
    errorData: { message: errorMessage },
    status: { status: 500 }
  }
}
