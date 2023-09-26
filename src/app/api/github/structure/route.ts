import { GitTreeResponse, Tree } from '@/types'
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
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}/git/trees/main?recursive=1`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
          'X-GitHub-Api-Version': '2022-11-28'
        }
      }
    )
    const data = (await response.json()) as GitTreeResponse
    const directory = data.tree.map((item: Tree) => ({
      path: item.path,
      type: item.type
    }))

    return NextResponse.json({ data: directory })
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
