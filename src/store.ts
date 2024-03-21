import { type Editor, type Range } from '@tiptap/core'
import { create } from 'zustand'

import { NodeName, Section } from '@/types/builder'
import { Feature } from '@/types/feature'
import { GitRepository } from '@/types/git'
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
}

export const useBuilder = create<BuilderState>()((set) => ({
  listSections: README_SECTIONS_DATA,
  tableOfContents: [],
  gitRepositoryData: undefined,
  gitUrlRepository: '',
  readmeEditor: undefined,
  moduleSelected: 'templates',
  range: undefined,
  sectionsFromTemplates: DEFAULT_INITIAL_SECTIONS,
  featureSelected: undefined,
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
  setFeatureSelected: (feature) => set({ featureSelected: feature })
}))
