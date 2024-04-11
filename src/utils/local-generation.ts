export const generateCompletionLocal = async ({
  model,
  prompt,
  format
}: {
  model: string
  prompt: string
  format: string
}) => {
  const res = await fetch(process.env.OLLAMA_URL + '/api/generate', {
    method: 'POST',
    body: JSON.stringify({
      model,
      prompt: prompt,
      system: 'You are a tech lead.',
      stream: false,
      options: {
        temperature: 0.7
      }
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  const data = await res.json()
  // console.log(JSON.parse(data.response))
  const result = format === 'json' ? JSON.parse(data.response) : data.response
  return result
}
