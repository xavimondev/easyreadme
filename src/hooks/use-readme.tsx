import { useCallback } from 'react'
import { DEFAULT_BADGES, DEFAULT_DATA_CACHED, DEFAULT_REPOSITORY_DATA } from '@/default-git-data'
import { LIST_TEMPLATES } from '@/templates'
import { findChildren } from '@tiptap/react'
import { toast } from 'sonner'

import { NodeName } from '@/types/builder'
import { GitRepository } from '@/types/git'

import { SECTIONS_EXCLUDED_FROM_TABLE_CONTENTS } from '@/constants'
import { getBadgeByName, getRepositoryTreeDirectory } from '@/utils/github'
import {
  getEnvironmentVariablesGuideData,
  getOverviewData,
  getProjectSummaryData,
  getTechStackData
} from '@/utils/readme'
import { getGenerationAI, getLicense, getRepositoryData } from '@/services/github'
import { useBuilder } from '@/store'
import { useSections } from '@/hooks/use-sections'

export function useReadme() {
  const {
    listSections,
    addSectionToTableOfContents,
    gitRepositoryData,
    readmeEditor,
    gitUrlRepository,
    setGitRepositoryData,
    templateSelected,
    setTableOfContents,
    tableOfContents
  } = useBuilder((store) => store)

  const { addBadge } = useSections()

  const updateNode = useCallback(
    ({ node, data }: { node: any; data?: any }) => {
      readmeEditor?.chain().updateAttributes(node, data).run()
    },
    [readmeEditor]
  )

  const removeNode = useCallback(
    (section: NodeName) => {
      const nodes = Object.values(readmeEditor?.schema.nodes ?? {}).filter((node) =>
        node.name.includes('custom-')
      )

      readmeEditor?.commands.forEach(nodes, (_, { tr, commands }) => {
        const item = findChildren(tr.doc, (node) => {
          return node.type.name === section
        })?.[0]
        if (!item) {
          return true
        }
        return commands.deleteRange({
          from: item.pos,
          to: item.pos + item.node.nodeSize
        })
      })
    },
    [readmeEditor]
  )

  const clearEditorContent = useCallback(() => {
    readmeEditor?.commands.clearContent()
  }, [readmeEditor])

  const findNodeByName = (nodeName: NodeName) => {
    let foundNode = null

    readmeEditor?.state.doc.descendants((node) => {
      if (node.type.name === nodeName) {
        foundNode = node
      }
    })

    return foundNode
  }

  const checkGitRepositoryData = async () => {
    if (!gitUrlRepository) return

    const data = await getRepositoryData({ urlRepository: gitUrlRepository })
    if (data) {
      setGitRepositoryData(data)
    }
    return data
  }

  const getTemplateSections = ({ template }: { template?: string }) => {
    const query = template ?? (templateSelected as string)
    if (!query) {
      toast.info(`You haven't selected a template.`)
      return
    }

    return LIST_TEMPLATES.find(({ nameTemplate }) => nameTemplate === query)!.sections
  }

  const buildTemplate = async ({ template }: { template?: string }) => {
    const gitData = await checkGitRepositoryData()

    const sections = getTemplateSections({ template })
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

    for (let i = 0; i < sections.length; i++) {
      const sectionId = sections.at(i)
      await addSection({
        section: sectionId!,
        gitData
      })
    }
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

    await addSection({
      section: section,
      options,
      gitData
    })
  }

  const addSection = async ({
    section,
    gitData,
    options
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

    let data = undefined

    if (section === NodeName.BADGE) {
      let badgesData = DEFAULT_BADGES

      if (options) {
        const { data } = options
        badgesData = data
      }

      if (Array.isArray(badgesData)) {
        for (let i = 0; i < badgesData.length; i++) {
          const id = badgesData.at(i)
          const badge = getBadgeByName({
            owner,
            repoName,
            badge: id!
          })
          addBadge({
            endPos: endPos + i,
            data: badge
          })
        }
        return
      }

      if (!gitRepositoryData) return

      const { id } = options?.data
      const badge = getBadgeByName({
        owner,
        repoName,
        badge: id
      })

      addBadge({
        endPos: -1,
        data: badge
      })
    } else if (section === NodeName.CONTRIBUTORS) {
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
    } else if (section === NodeName.ALERT) {
      data = 'info'
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
