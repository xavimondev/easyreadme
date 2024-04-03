import { type Editor, type Range } from '@tiptap/core'
import { create } from 'zustand'

import { NodeName, Section } from '@/types/builder'
import { Feature } from '@/types/feature'
import { GitRepository } from '@/types/git'
import { JobSection, Queue, Status } from '@/types/queue'
import { ModuleType } from '@/types/sidebar'

import { DEFAULT_INITIAL_SECTIONS, README_SECTIONS_DATA } from './sections'

type TableOfContentsSection = {
  id: NodeName
  name: string
}

type BuilderState = {
  listSections: Section[]
  tableOfContents: TableOfContentsSection[]
  setTableOfContents: (tableOfContents: TableOfContentsSection[]) => void
  addSectionToTableOfContents: (tableOfContents: TableOfContentsSection) => void
  removeSectionFromTableOfContents: (section: NodeName) => void
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
  featureSelected: Feature | undefined
  setFeatureSelected: (feature: Feature) => void
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
  tableOfContents: [],
  gitRepositoryData: undefined,
  gitUrlRepository: '',
  readmeEditor: undefined,
  moduleSelected: 'templates',
  range: undefined,
  sectionsFromTemplates: DEFAULT_INITIAL_SECTIONS,
  featureSelected: undefined,
  queue: INITIAL_QUEUE,
  toastId: undefined,
  setTableOfContents: (tableOfContents: TableOfContentsSection[]) => set({ tableOfContents }),
  addSectionToTableOfContents: (tableOfContents: TableOfContentsSection) =>
    set((prevValues) => ({
      tableOfContents: prevValues.tableOfContents.concat(tableOfContents)
    })),
  removeSectionFromTableOfContents: (section: NodeName) =>
    set((prevValues) => ({
      tableOfContents: prevValues.tableOfContents.filter((item) => item.id !== section)
    })),
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
