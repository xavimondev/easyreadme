import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    if (!process.env.GITHUB_ACCESS_TOKEN || process.env.GITHUB_ACCESS_TOKEN === '') {
      return new Response('Missing GITHUB_ACCESS_TOKEN – make sure to add it to your .env file.', {
        status: 400
      })
    }
    const params = new URL(req.url)
    const repoName = params.searchParams.get('repo')
    const owner = params.searchParams.get('owner')
    const response = await fetch(`https://api.github.com/repos/${owner}/${repoName}/languages`, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    const res = await response.json()
    return NextResponse.json({ data: res, error: undefined })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        data: undefined,
        error: 'An error has ocurred'
      },
      {
        status: 500
      }
    )
  }
}
