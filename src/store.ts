import { create } from 'zustand'

import { NodeName, SectionState } from '@/types/builder'
import { NameTemplate } from '@/types/readme'

import { DEFAULT_CONTENT, INITIAL_STATE_SECTIONS } from '@/constants'

type BuilderState = {
  templateSelected: NameTemplate
  setTemplateSelected: (templateName: NameTemplate) => void
  contentTemplate: string
  addContentToTemplate: (content: string) => void
  setContentTemplate: (content: string) => void
  clearContentTemplate: () => void
  isGenerating: boolean
  setIsGenerating: (isGenerating: boolean) => void
  listSections: SectionState[]
  updateSection: (section: NodeName) => void
}

export const useBuilder = create<BuilderState>()((set) => ({
  templateSelected: 'Minimal',
  contentTemplate: DEFAULT_CONTENT,
  isGenerating: false,
  listSections: INITIAL_STATE_SECTIONS,
  setTemplateSelected: (templateName: NameTemplate) => set({ templateSelected: templateName }),
  addContentToTemplate: (content: string) =>
    set((prevContent) => ({ contentTemplate: prevContent.contentTemplate.concat(content) })),
  setContentTemplate: (content: string) => set({ contentTemplate: content }),
  clearContentTemplate: () => set({ contentTemplate: '' }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  updateSection: (section: NodeName) => {
    set((prevSections) => ({
      listSections: prevSections.listSections.map((s) =>
        s.id === section ? { ...s, added: !s.added } : s
      )
    }))
  }
}))
