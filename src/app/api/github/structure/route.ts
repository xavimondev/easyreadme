import { NextResponse } from 'next/server'

import { GitTreeResponse, Tree } from '@/types/git'

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
    const branch = params.searchParams.get('branch')
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}/git/trees/${branch}?recursive=1`,
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

    return NextResponse.json({ data: directory, error: undefined })
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
