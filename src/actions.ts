'use server'

import { cookies } from 'next/headers'

import { COOKIE_NAME } from './constants'

export const setApiKey = (formData: FormData) => {
  const apiKey = formData.get('key') as string
  cookies().set(COOKIE_NAME, apiKey, {
    secure: true
  })
}

export const getApiKey = () => {
  return cookies().get(COOKIE_NAME)?.value
}
