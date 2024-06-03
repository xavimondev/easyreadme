import { type Editor, type Range } from '@tiptap/core'
import { create } from 'zustand'

import { NodeName, Section } from '@/types/builder'
import { GitRepository } from '@/types/git'
import { JobSection, Queue, Status } from '@/types/queue'
import { ModuleType } from '@/types/sidebar'

import { DEFAULT_INITIAL_SECTIONS, README_SECTIONS_DATA } from './sections'

type FeatureSelected = { title: string; description: string; textColorTitle: string }

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
  featureSelected: FeatureSelected
  setFeatureSelected: (feature: FeatureSelected) => void
  queue: Queue
  addJobToQueue: (job: JobSection | JobSection[]) => void
  updateStatusJobs: (sectionId: string, status: Status, isProcessing: boolean) => void
  clearQueue: () => void
  toastId: number | undefined
  setToastId: (toastId: number | undefined) => void
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
  featureSelected: {
    title: 'AI',
    description: 'Reduce complexity and enhance productivity effortlessly with AI.',
    textColorTitle: 'from-yellow-100 to-yellow-700'
  },
  queue: INITIAL_QUEUE,
  toastId: undefined,
  setGitRepositoryData: (data) => set({ gitRepositoryData: data }),
  setGitUrlRepository: (url) => set({ gitUrlRepository: url }),
  setReadmeEditor: (editor) => set({ readmeEditor: editor }),
  setModuleSelected: (moduleSelected) => set({ moduleSelected }),
  setRange: (range) => set({ range }),
  setSectionsFromTemplates: (sections) => set({ sectionsFromTemplates: sections }),
  setFeatureSelected: (feature) => set({ featureSelected: feature }),
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
  setToastId: (toastId) => set({ toastId })
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
