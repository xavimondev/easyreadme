import { useEffect } from 'react'
import { DEFAULT_DATA_CACHED } from '@/default-git-data'
import { README_SECTIONS_DATA } from '@/sections'
import { toast } from 'sonner'
import { useShallow } from 'zustand/react/shallow'

import { AIProvider } from '@/types/ai'
import { NodeName } from '@/types/builder'
import { GitRepository } from '@/types/git'
import { JobSection } from '@/types/queue'

import { readmeFactory } from '@/utils/readme'
import { clearEditor, getPos } from '@/utils/tiptap'
import { getRepositoryData } from '@/services/github'
import { checkRateLimit } from '@/services/rate-limit'
import { useBuilder } from '@/store'
import { useRemaining } from '@/hooks/use-remaining'
import { SectionsLoader } from '@/components/sections-loader'

export function useReadme() {
  // See: https://github.com/pmndrs/zustand/discussions/2203 and https://docs.pmnd.rs/zustand/guides/prevent-rerenders-with-use-shallow
  const [
    listSections,
    gitRepositoryData,
    readmeEditor,
    gitUrlRepository,
    setGitRepositoryData,
    sectionsFromTemplates,
    moduleSelected,
    queue,
    addJobToQueue,
    clearQueue,
    toastId,
    setToastId,
    providerAISelected
  ] = useBuilder(
    useShallow((state) => [
      state.listSections,
      state.gitRepositoryData,
      state.readmeEditor,
      state.gitUrlRepository,
      state.setGitRepositoryData,
      state.sectionsFromTemplates,
      state.moduleSelected,
      state.queue,
      state.addJobToQueue,
      state.clearQueue,
      state.toastId,
      state.setToastId,
      state.providerAISelected
    ])
  )
  const { mutate } = useRemaining()

  // TODO: I think there will be better ways to do this.
  useEffect(() => {
    if (!readmeEditor || moduleSelected === 'custom') return

    const generateReadme = async () => {
      await buildTemplate()
    }
    generateReadme()
  }, [sectionsFromTemplates, readmeEditor])

  useEffect(() => {
    if (queue.jobs.length === 0) return
    if (queue.isProcessing) return

    const queueEmpty = queue.jobs.every((job) => job.status === 'completed')

    if (queueEmpty) {
      setTimeout(() => {
        toast.dismiss(toastId)
        setToastId(undefined)

        clearQueue()
      }, 2000)
    }
  }, [queue])

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

    clearEditor({ editor: readmeEditor! })

    let sectionsToGenerate = sectionsFromTemplates

    if (gitData) {
      // At this point let's check rate limit, in case there are not credits, readme will only have non-AI sections.
      // Otherwise run mutate
      const msg = await checkRateLimit()
      if (msg) {
        sectionsToGenerate = sectionsFromTemplates.filter((section) => {
          const sectionsData = README_SECTIONS_DATA.find((rs) => rs.id === section)
          return !sectionsData?.useAi
        })
      }

      const listJobs = sectionsToGenerate.map((sectionId) => {
        const sectionItem = listSections.find((sec) => sec.id === sectionId)

        const { id, name } = sectionItem!
        const job: JobSection = {
          id,
          name,
          status: 'idle',
          task: () =>
            addSection({
              section: sectionId!,
              gitData
            })
        }
        return job
      })

      addJobToQueue(listJobs)

      if (!toastId) {
        const toastId = toast(<SectionsLoader />, {
          duration: Infinity
        })
        setToastId(toastId as number)
      }
    } else {
      for (let i = 0; i < sectionsToGenerate.length; i++) {
        const sectionId = sectionsFromTemplates.at(i)
        await addSection({
          section: sectionId!,
          gitData
        })
      }
    }

    if (gitData) {
      mutate()
    }
  }

  const buildCustomReadme = async ({ section }: { section: NodeName }) => {
    const gitData = await checkGitRepositoryData()
    const sectionItem = listSections.find((sec) => sec.id === section)

    if (!sectionItem) return

    if (gitData && sectionItem.useAi) {
      const msg = await checkRateLimit()
      if (msg) {
        toast.error(msg)
        return
      }
    }

    const { id, name } = sectionItem

    addJobToQueue({
      id,
      name,
      status: 'idle',
      task: () =>
        addSection({
          section,
          gitData
        })
    })

    if (!toastId) {
      const toastId = toast(<SectionsLoader />, {
        duration: Infinity
      })
      setToastId(toastId as number)
    }
  }

  const addSection = async ({
    section,
    gitData
  }: {
    section: NodeName
    gitData?: GitRepository
  }) => {
    const repositoryData = gitData ?? gitRepositoryData
    const endPos = getPos({ editor: readmeEditor! })

    const sectionItem = listSections.find((sec) => sec.id === section)
    if (!sectionItem) return

    let result: any = undefined

    if (!repositoryData) {
      // @ts-ignore
      result = DEFAULT_DATA_CACHED[section]
    } else {
      const res = await readmeFactory({
        repositoryData,
        section,
        providerAISelected: providerAISelected as AIProvider
      })
      if (!res) {
        result = undefined
      } else {
        const { error, data } = res
        if (error) {
          toast.error(error)
          return
        }
        result = data
      }
    }

    const { add } = sectionItem
    add({
      editor: readmeEditor!,
      endPos,
      data: result
    })
  }

  return {
    buildCustomReadme,
    buildTemplate
  }
}
