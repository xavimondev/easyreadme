import { NextResponse, type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    if (!process.env.GITHUB_ACCESS_TOKEN || process.env.GITHUB_ACCESS_TOKEN === '') {
      return new Response('Missing GITHUB_ACCESS_TOKEN – make sure to add it to your .env file.', {
        status: 400
      })
    }
    const params = req.nextUrl.searchParams
    const repoName = params.get('repo')
    const owner = params.get('owner')
    const response = await fetch(`https://api.github.com/repos/${owner}/${repoName}/license`, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
    if (!response.ok) return NextResponse.json({ error: 'License not found' }, { status: 404 })

    const res = await response.json()
    const license = {
      name: res.license.name,
      url: res.html_url
    }
    return NextResponse.json({ data: license })
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
