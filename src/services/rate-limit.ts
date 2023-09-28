export const checkRateLimit = async () => {
  const request = await fetch('api/rate-limit', {
    method: 'POST'
  })

  if (request.status === 429) {
    return 'You are being rate limited. Please try again later.'
  }

  const response = await request.json()

  const { msg } = response
  return msg
}
