import { useEffect } from 'react'
import { DEFAULT_DATA_CACHED } from '@/default-git-data'
import { README_SECTIONS_DATA } from '@/sections'
import { toast } from 'sonner'

import { NodeName } from '@/types/builder'
import { GitRepository } from '@/types/git'

import { SECTIONS_EXCLUDED_FROM_TABLE_CONTENTS } from '@/constants'
import { readmeFactory } from '@/utils/readme'
import { clearEditor } from '@/utils/tiptap'
import { getRepositoryData } from '@/services/github'
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

    if (!repositoryData) {
      // @ts-ignore
      data = DEFAULT_DATA_CACHED[section]
    } else {
      data = await readmeFactory({ repositoryData, section })
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
