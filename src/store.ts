import { create } from 'zustand'
import { NameTemplate } from '@/types'
import { DEFAULT_CONTENT } from '@/constants'

type BuilderState = {
  templateSelected: NameTemplate
  setTemplateSelected: (templateName: NameTemplate) => void
  contentTemplate: string
  addContentToTemplate: (content: string) => void
  clearContentTemplate: () => void
  isGenerating: boolean
  setIsGenerating: (isGenerating: boolean) => void
}

export const useBuilder = create<BuilderState>()((set) => ({
  templateSelected: 'Minimal',
  contentTemplate: DEFAULT_CONTENT,
  isGenerating: false,
  setTemplateSelected: (templateName: NameTemplate) => set({ templateSelected: templateName }),
  addContentToTemplate: (content: string) =>
    set((prevContent) => ({ contentTemplate: prevContent.contentTemplate.concat(content) })),
  clearContentTemplate: () => set({ contentTemplate: '' }),
  setIsGenerating: (isGenerating) => set({ isGenerating })
}))
