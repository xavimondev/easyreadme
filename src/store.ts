import { type Editor, type Range } from '@tiptap/core'
import { create } from 'zustand'

import { AIProvider } from '@/types/ai'
import { NodeName, Section } from '@/types/builder'
import { GitRepository } from '@/types/git'
import { JobSection, Queue, Status } from '@/types/queue'
import { ModuleType } from '@/types/sidebar'

import { DEFAULT_INITIAL_SECTIONS, README_SECTIONS_DATA } from './sections'

type BuilderState = {
  listSections: Section[]
  gitRepositoryData: GitRepository | undefined
  setGitRepositoryData: (data: GitRepository) => void
  gitUrlRepository: string
  setGitUrlRepository: (url: string) => void
  readmeEditor: Editor | undefined
  setReadmeEditor: (editor: Editor) => void
  moduleSelected: ModuleType
  setModuleSelected: (moduleSelected: ModuleType) => void
  range: Range | undefined
  setRange: (range: Range) => void
  sectionsFromTemplates: NodeName[]
  setSectionsFromTemplates: (sectionsTemplate: NodeName[]) => void
  queue: Queue
  addJobToQueue: (job: JobSection | JobSection[]) => void
  updateStatusJobs: (sectionId: string, status: Status, isProcessing: boolean) => void
  clearQueue: () => void
  toastId: number | undefined
  setToastId: (toastId: number | undefined) => void
  providerAISelected: AIProvider | undefined
  setProviderAISelected: (provider: AIProvider) => void
}

const INITIAL_QUEUE = { isProcessing: false, jobs: [] }
export const useBuilder = create<BuilderState>()((set, get) => ({
  listSections: README_SECTIONS_DATA,
  gitRepositoryData: undefined,
  gitUrlRepository: '',
  readmeEditor: undefined,
  moduleSelected: 'templates',
  range: undefined,
  sectionsFromTemplates: DEFAULT_INITIAL_SECTIONS,
  queue: INITIAL_QUEUE,
  toastId: undefined,
  providerAISelected: undefined,
  setGitRepositoryData: (data) => set({ gitRepositoryData: data }),
  setGitUrlRepository: (url) => set({ gitUrlRepository: url }),
  setReadmeEditor: (editor) => set({ readmeEditor: editor }),
  setModuleSelected: (moduleSelected) => set({ moduleSelected }),
  setRange: (range) => set({ range }),
  setSectionsFromTemplates: (sections) => set({ sectionsFromTemplates: sections }),
  clearQueue: () => set({ queue: INITIAL_QUEUE }),
  addJobToQueue: (job) => {
    set((prevValues) => ({
      queue: {
        isProcessing: prevValues.queue.isProcessing,
        jobs: Array.isArray(job)
          ? [...prevValues.queue.jobs, ...job]
          : [...prevValues.queue.jobs, job]
      }
    }))
  },
  updateStatusJobs: (sectionId: string, status: Status, isProcessing) => {
    const jobsUpdated = get().queue.jobs.map((section) =>
      section.id === sectionId ? { ...section, status } : section
    )
    set({
      queue: {
        isProcessing,
        jobs: jobsUpdated
      }
    })
  },
  setToastId: (toastId) => set({ toastId }),
  setProviderAISelected: (provider) => set({ providerAISelected: provider })
}))

useBuilder.subscribe((state, prevValues) => {
  if (
    prevValues.queue.jobs.length !== state.queue.jobs.length ||
    prevValues.queue.isProcessing !== state.queue.isProcessing
  ) {
    const { jobs, isProcessing } = state.queue

    if (jobs.length === 0) return
    if (isProcessing) return

    const job = jobs.find((job) => job.status === 'idle')

    if (!job) return
    const { id, task } = job

    state.updateStatusJobs(id, 'loading', true)

    Promise.resolve(task()).finally(() => {
      state.updateStatusJobs(id, 'completed', false)
    })
  }
})
