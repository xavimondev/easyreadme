import { type Editor } from '@tiptap/core'
import { create } from 'zustand'

import { NodeName, SectionState } from '@/types/builder'
import { GitRepository } from '@/types/git'
import { NameTemplate } from '@/types/readme'
import { ModuleType } from '@/types/sidebar'

import { DEFAULT_CONTENT } from '@/constants'

import { INITIAL_STATE_SECTIONS } from './sections'

type TableOfContentsSection = {
  id: NodeName
  name: string
}

type BuilderState = {
  templateSelected: NameTemplate | undefined
  setTemplateSelected: (templateName: NameTemplate) => void
  contentTemplate: string
  addContentToTemplate: (content: string) => void
  setContentTemplate: (content: string) => void
  clearContentTemplate: () => void
  isGenerating: boolean
  setIsGenerating: (isGenerating: boolean) => void
  listSections: SectionState[]
  updateSection: (section: NodeName | NodeName[]) => void
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
}

export const useBuilder = create<BuilderState>()((set) => ({
  templateSelected: undefined,
  contentTemplate: DEFAULT_CONTENT,
  isGenerating: false,
  listSections: INITIAL_STATE_SECTIONS,
  tableOfContents: [],
  gitRepositoryData: undefined,
  gitUrlRepository: '',
  readmeEditor: undefined,
  moduleSelected: 'templates',
  setTemplateSelected: (templateName: NameTemplate) => set({ templateSelected: templateName }),
  addContentToTemplate: (content: string) =>
    set((prevContent) => ({ contentTemplate: prevContent.contentTemplate.concat(content) })),
  setContentTemplate: (content: string) => set({ contentTemplate: content }),
  clearContentTemplate: () => set({ contentTemplate: '' }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  updateSection: (data: NodeName | NodeName[]) => {
    set((prevValues) => ({
      listSections: prevValues.listSections.map((s) => {
        if (Array.isArray(data)) {
          const isSectionIncluded = data.includes(s.id)

          return isSectionIncluded ? { ...s, added: !s.added } : s
        }
        return s.id === data ? { ...s, added: !s.added } : s
      })
    }))
  },
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
  setModuleSelected: (moduleSelected) => set({ moduleSelected })
}))
