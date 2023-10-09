import { Tree } from '@/types'
import { getRepositoryDetails } from '@/utils/github'

export const getRepositoryStructure = async ({
  urlRepository
}: {
  urlRepository: string
}): Promise<Tree[] | null> => {
  const { owner, repoName } = getRepositoryDetails({
    urlRepository
  })
  try {
    const response = await fetch(`api/github/structure?repo=${repoName}&owner=${owner}`)
    const repository = await response.json()
    return repository.data
  } catch (error) {
    //console.error(error)
    return null
  }
}

export const getMainLanguage = async ({ owner, repoName }: { owner: string; repoName: string }) => {
  try {
    const response = await fetch(`api/github/language?repo=${repoName}&owner=${owner}`)
    const language = await response.json()
    return language.data
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
