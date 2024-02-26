import { useCallback } from 'react'
import { ALL_BADGES, DEFAULT_BADGES } from '@/badges'
import { DEFAULT_DATA_CACHED, DEFAULT_REPOSITORY_DATA } from '@/default-git-data'
import { toast } from 'sonner'

import { NodeName } from '@/types/builder'
import { GitRepository } from '@/types/git'

import { SECTIONS_EXCLUDED_FROM_TABLE_CONTENTS } from '@/constants'
import { getRepositoryTreeDirectory } from '@/utils/github'
import {
  getEnvironmentVariablesGuideData,
  getOverviewData,
  getProjectSummaryData,
  getTechStackData
} from '@/utils/readme'
import { getGenerationAI, getLanguages, getLicense, getRepositoryData } from '@/services/github'
import { useBuilder } from '@/store'

export function useReadme() {
  const {
    listSections,
    addSectionToTableOfContents,
    gitRepositoryData,
    readmeEditor,
    gitUrlRepository,
    setGitRepositoryData,
    setTableOfContents,
    tableOfContents
  } = useBuilder((store) => store)

  const clearEditorContent = useCallback(() => {
    readmeEditor?.commands.clearContent()
  }, [readmeEditor])

  const checkGitRepositoryData = async () => {
    if (!gitUrlRepository) return

    const data = await getRepositoryData({ urlRepository: gitUrlRepository })
    if (data) {
      setGitRepositoryData(data)
    }
    return data
  }

  const buildTemplate = async ({ sections }: { sections?: NodeName[] }) => {
    const gitData = await checkGitRepositoryData()

    if (!sections) return

    const filteredSections = sections.filter(
      (section) => !SECTIONS_EXCLUDED_FROM_TABLE_CONTENTS.includes(section)
    )

    // Updating table of contents
    const mappedSections = filteredSections.map((section) => {
      const sectionData = listSections.find(({ id }) => id === section)!
      return {
        id: sectionData.id,
        name: sectionData.name
      }
    })

    setTableOfContents(mappedSections)
    clearEditorContent()

    const toastId = toast.loading(`Generating Readme...`)
    for (let i = 0; i < sections.length; i++) {
      const sectionId = sections.at(i)
      await addSection({
        section: sectionId!,
        gitData
      })
    }
    toast.dismiss(toastId)
    toast.success(`Readme generated.`)
  }

  const buildCustomReadme = async ({
    section,
    options
  }: {
    section: NodeName
    options?: { data: any }
  }) => {
    const gitData = await checkGitRepositoryData()

    const sectionItem = listSections.find((sec) => sec.id === section)
    const itemExistsInTableOfContent = tableOfContents.find((sec) => sec.id === section)

    if (!sectionItem) return

    if (!SECTIONS_EXCLUDED_FROM_TABLE_CONTENTS.includes(section) && !itemExistsInTableOfContent) {
      addSectionToTableOfContents({
        id: sectionItem.id,
        name: sectionItem.name
      })
    }

    const promise = addSection({
      section: section,
      options,
      gitData
    })

    toast.promise(promise, {
      loading: 'Adding section...',
      success: () => {
        return `Section added.`
      },
      error: 'Error'
    })
  }

  const addSection = async ({
    section,
    gitData
  }: {
    section: NodeName
    gitData?: GitRepository
    options?: { data: any }
  }) => {
    const repositoryData = gitData ?? gitRepositoryData
    const { repoName, owner, branch, language, urlRepository, description } =
      repositoryData ?? DEFAULT_REPOSITORY_DATA
    let endPos = 0
    const lastNode = readmeEditor?.state.doc.lastChild
    if (lastNode) {
      const lastNodePos = readmeEditor?.state.doc.resolve(
        readmeEditor?.state.doc.content.size - lastNode.nodeSize
      )
      const { pos } = lastNodePos
      endPos = pos
    }

    const sectionItem = listSections.find((sec) => sec.id === section)
    if (!sectionItem) return

    let data: any = undefined

    if (section === NodeName.CONTRIBUTORS) {
      data = {
        repository: repoName,
        owner
      }
    } else if (section === NodeName.LICENSE) {
      data = DEFAULT_DATA_CACHED[section]
      if (repositoryData) {
        data = await getLicense({
          repoName,
          owner
        })
      }
    } else if (section === NodeName.OVERVIEW) {
      if (!repositoryData) {
        data = {
          content: DEFAULT_DATA_CACHED[section].content
        }
      } else {
        const prompt = await getOverviewData({
          branch,
          description,
          language,
          owner,
          repoName
        })

        const response = await getGenerationAI({
          format: 'string',
          prompt
        })

        if (response.name === 'Error') {
          toast.error(response.message)
          return
        }

        data = {
          content: response.data
        }
      }
    } else if (section === NodeName.PROJECT_STRUCTURE) {
      data = await getRepositoryTreeDirectory({
        repoName,
        owner: owner,
        branch
      })
    } else if (section === NodeName.PROJECT_SUMMARY) {
      if (!repositoryData) {
        data = DEFAULT_DATA_CACHED[section]
      } else {
        const prompt = await getProjectSummaryData({
          owner,
          repoName,
          branch,
          language
        })

        if (prompt === '') {
          data = {
            content: []
          }
        } else {
          const response = await getGenerationAI({
            format: 'json',
            prompt
          })

          if (response.name === 'Error') {
            toast.error(response.message)
            return
          }

          data = {
            content: response.data.data
          }
        }
      }
    } else if (section === NodeName.RUN_LOCALLY) {
      let mainLanguage = DEFAULT_DATA_CACHED[section].mainLanguage

      if (repositoryData) {
        mainLanguage = language
      }

      data = {
        mainLanguage,
        repoName,
        urlRepository
      }
    } else if (section === NodeName.SETTING_UP) {
      if (!repositoryData) {
        data = DEFAULT_DATA_CACHED[section]
      } else {
        const prompt = await getEnvironmentVariablesGuideData({
          owner,
          repoName
        })
        if (prompt === '') {
          data = {
            content: []
          }
        } else {
          const response = await getGenerationAI({
            format: 'json',
            prompt
          })

          if (response.name === 'Error') {
            toast.error(response.message)
            return
          }

          data = {
            content: response.data.data
          }
        }
      }
    } else if (section === NodeName.TECH_STACK) {
      if (!repositoryData) {
        data = DEFAULT_DATA_CACHED[section]
      } else {
        const prompt = await getTechStackData({
          branch,
          language,
          owner,
          repoName
        })

        if (prompt === '') {
          data = {
            content: []
          }
        } else {
          const response = await getGenerationAI({
            format: 'json',
            prompt
          })

          if (response.name === 'Error') {
            toast.error(response.message)
            return
          }

          data = {
            content: response.data.dependencies
          }
        }
      }
    } else if (section === NodeName.BADGE) {
      data = {
        owner,
        repoName
      }

      if (!repositoryData) {
        data.badges = DEFAULT_DATA_CACHED[section]
      } else {
        const languages = await getLanguages({
          owner,
          repoName
        })
        const languagesWithoutMainLanguage = Object.keys(languages)
          .filter((lang) => lang.toLocaleLowerCase() !== language.toLocaleLowerCase())
          .map((lang) => lang.toLowerCase())

        const programmingBadges = ALL_BADGES.filter((badge) =>
          languagesWithoutMainLanguage.includes(badge.id.toLowerCase())
        ).map(({ name, url }) => ({ name, url, isGithub: false }))
        data.badges = DEFAULT_BADGES.concat(programmingBadges)
      }
    }

    const { add } = sectionItem
    add({
      editor: readmeEditor!,
      endPos,
      data
    })
  }

  return {
    buildCustomReadme,
    buildTemplate
  }
}
