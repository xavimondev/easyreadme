import { kv } from '@vercel/kv'

export const addGeneration = async () => {
  try {
    const totalGenerations = await getCountGenerations()
    if (totalGenerations == null) throw new Error('An error has ocurred getting total generations')
    const res = await kv.set('totalGenerations', totalGenerations + 1)
    return res
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getCountGenerations = async () => {
  try {
    const totalGenerations = (await kv.get<number>('totalGenerations')) ?? 0
    return totalGenerations
  } catch (error) {
    console.error(error)
    return null
  }
}
