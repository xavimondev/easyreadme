import { type Editor, type Range } from '@tiptap/core'
import { create } from 'zustand'

import { NodeName, Section } from '@/types/builder'
import { GitRepository } from '@/types/git'
import { NameTemplate } from '@/types/readme'
import { ModuleType } from '@/types/sidebar'

import { README_SECTIONS_DATA } from './sections'

type TableOfContentsSection = {
  id: NodeName
  name: string
}

type BuilderState = {
  templateSelected: NameTemplate | undefined
  setTemplateSelected: (templateName: NameTemplate) => void
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
}

export const useBuilder = create<BuilderState>()((set) => ({
  templateSelected: undefined,
  listSections: README_SECTIONS_DATA,
  tableOfContents: [],
  gitRepositoryData: undefined,
  gitUrlRepository: '',
  readmeEditor: undefined,
  moduleSelected: 'templates',
  range: undefined,
  setTemplateSelected: (templateName: NameTemplate) => set({ templateSelected: templateName }),
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
  setRange: (range) => set({ range })
}))
