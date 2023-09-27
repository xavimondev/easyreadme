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
    const path = params.searchParams.get('path')
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}/contents/${path}`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
          'X-GitHub-Api-Version': '2022-11-28'
        }
      }
    )
    if (!response.ok)
      return NextResponse.json({ error: 'Environment file not found' }, { status: 404 })

    const data = await response.json()
    const content = atob(data.content)

    return NextResponse.json({ data: content })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        error: 'An error has ocurred'
      },
      {
        status: 500
      }
    )
  }
}
