import { GitRepository, Tree } from '@/types/git'

import { getRepoNameAndOwnerFromUrl } from '@/utils/github'

export const getRepositoryStructure = async ({
  owner,
  repoName,
  branch
}: {
  owner: string
  repoName: string
  branch: string
}): Promise<Tree[] | null> => {
  try {
    const response = await fetch(
      `api/github/structure?repo=${repoName}&owner=${owner}&branch=${branch}`
    )
    const repository = await response.json()
    return repository.data
  } catch (error) {
    //console.error(error)
    return null
  }
}

export const getFileContents = async ({
  path,
  owner,
  repoName
}: {
  path: string
  owner: string
  repoName: string
}) => {
  try {
    const response = await fetch(
      `api/github/file-contents?owner=${owner}&repo=${repoName}&path=${path}`
    )
    const contents = await response.json()
    return contents.data
  } catch (error) {
    // console.log(error)
    return null
  }
}

export const getContributors = async ({
  repoName,
  owner,
  page = 1
}: {
  repoName: string
  owner: string
  page?: number
}) => {
  try {
    const response = await fetch(
      `api/github/contributors?owner=${owner}&repo=${repoName}&page=${page}`
    )
    const contributors = await response.json()
    return contributors.data
  } catch (error) {
    // console.error(error)
    return null
  }
}

export const getLicense = async ({ repoName, owner }: { repoName: string; owner: string }) => {
  try {
    const response = await fetch(`api/github/license?owner=${owner}&repo=${repoName}`)
    const license = await response.json()
    return license.data
  } catch (error) {
    // console.error(error)
    return null
  }
}

export const getRepositoryData = async ({ urlRepository }: { urlRepository: string }) => {
  try {
    const { repoName, owner } = getRepoNameAndOwnerFromUrl({ urlRepository })
    const response = await fetch(`api/github/repo-details?owner=${owner}&repo=${repoName}`)
    const data = await response.json()
    if (data.error) throw new Error(data.error)
    return data.data as GitRepository
  } catch (error) {
    // console.error(error)
    return null
  }
}
