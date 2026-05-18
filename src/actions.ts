'use server'

import { cookies } from 'next/headers'

import { COOKIE_NAME } from './constants'

export const setApiKey = async (formData: FormData) => {
  const apiKey = formData.get('key') as string
  const cookieStore = await cookies()

  cookieStore.set(COOKIE_NAME, apiKey, {
    secure: true
  })
}

export const getApiKey = async () => {
  const cookieStore = await cookies()

  return cookieStore.get(COOKIE_NAME)?.value
}
