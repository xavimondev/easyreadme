import { useEffect } from 'react'
import { ALL_BADGES, DEFAULT_BADGES } from '@/badges'
import { DEFAULT_DATA_CACHED, DEFAULT_REPOSITORY_DATA } from '@/default-git-data'
import { README_SECTIONS_DATA } from '@/sections'
import { toast } from 'sonner'

import { NodeName } from '@/types/builder'
import { GitRepository } from '@/types/git'

import { SECTIONS_EXCLUDED_FROM_TABLE_CONTENTS } from '@/constants'
import { getPrerequisites, getRepositoryTreeDirectory } from '@/utils/github'
import {
  getMonorepoSummaryPrompt,
  getOverviewPrompt,
  getProjectSummaryPrompt,
  getSettingUpPrompt,
  getTechStackPrompt
} from '@/utils/prompt-factory'
import { clearEditor } from '@/utils/tiptap'
import { getGenerationAI, getLanguages, getLicense, getRepositoryData } from '@/services/github'
import { checkRateLimit } from '@/services/rate-limit'
import { useBuilder } from '@/store'
import { useRemaining } from '@/hooks/use-remaining'

export function useReadme() {
  const {
    listSections,
    addSectionToTableOfContents,
    gitRepositoryData,
    readmeEditor,
    gitUrlRepository,
    setGitRepositoryData,
    setTableOfContents,
    tableOfContents,
    sectionsFromTemplates,
    moduleSelected
  } = useBuilder((store) => store)
  const { mutate } = useRemaining()

  // TODO: I think there will be better ways to do this.
  useEffect(() => {
    if (!readmeEditor || moduleSelected === 'custom') return

    const generateReadme = async () => {
      await buildTemplate()
    }
    generateReadme()
  }, [sectionsFromTemplates, readmeEditor])

  const checkGitRepositoryData = async () => {
    if (!gitUrlRepository) return

    const data = await getRepositoryData({ urlRepository: gitUrlRepository })
    if (data) {
      setGitRepositoryData(data)
    }
    return data
  }

  const buildTemplate = async () => {
    const gitData = await checkGitRepositoryData()

    if (!sectionsFromTemplates) return

    const filteredSections = sectionsFromTemplates.filter(
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
    clearEditor({ editor: readmeEditor! })

    let toastId = undefined
    if (gitData) {
      toastId = toast.loading(`Generating Readme...`)
    }

    let sectionsToGenerate = sectionsFromTemplates

    // At this point let's check rate limit, in case there are not credits, readme will only have non-AI sections.
    // Otherwise run mutate
    if (gitData) {
      const msg = await checkRateLimit()
      if (msg) {
        sectionsToGenerate = sectionsFromTemplates.filter((section) => {
          const sectionsData = README_SECTIONS_DATA.find((rs) => rs.id === section)
          return !sectionsData?.useAi
        })
      }
    }

    for (let i = 0; i < sectionsToGenerate.length; i++) {
      const sectionId = sectionsFromTemplates.at(i)
      await addSection({
        section: sectionId!,
        gitData
      })
    }

    if (gitData) {
      toast.dismiss(toastId)
      toast.success(`Readme generated.`)
      mutate()
    }
  }

  const buildCustomReadme = async ({ section }: { section: NodeName }) => {
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

    if (gitData && sectionItem.useAi) {
      const msg = await checkRateLimit()

      if (msg) {
        toast.error(msg)
        return
      }
    }

    const promise = addSection({
      section: section,
      gitData
    })

    toast.promise(promise, {
      loading: 'Adding section...',
      success: () => {
        if (gitData && sectionItem.useAi) {
          mutate()
        }
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
        const prompt = await getOverviewPrompt({
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

        if (!response || response.message || response.name === 'Error') {
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
        const prompt = await getProjectSummaryPrompt({
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

          if (!response || response.message || response.name === 'Error') {
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
        const prompt = await getSettingUpPrompt({
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

          if (!response || response.message || response.name === 'Error') {
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
        const prompt = await getTechStackPrompt({
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

          if (!response || response.message || response.name === 'Error') {
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
    } else if (section === NodeName.PREREQUISITES) {
      data = !repositoryData
        ? DEFAULT_DATA_CACHED[section]
        : await getPrerequisites({
            defaultBranch: branch,
            language,
            owner,
            repoName
          })
    } else if (section === NodeName.MONOREPO_SUMMARY) {
      if (!repositoryData) {
        data = DEFAULT_DATA_CACHED[section]
      } else {
        const prompt = await getMonorepoSummaryPrompt({
          repoName,
          owner,
          language,
          branch
        })

        if (prompt === '') {
          data = DEFAULT_DATA_CACHED[section]
        } else {
          const response = await getGenerationAI({
            format: 'json',
            prompt
          })

          if (!response || response.message || response.name === 'Error') {
            toast.error(response.message)
            return
          }

          data = {
            content: response.data.data
          }
        }
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
