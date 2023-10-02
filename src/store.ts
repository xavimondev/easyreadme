import { create } from 'zustand'
import { NameTemplate } from '@/types'

type TemplateState = {
  templateSelected: NameTemplate
  setTemplateSelected: (templateName: NameTemplate) => void
  contentTemplate: string
  setContentTemplate: (content: string) => void
  clearContentTemplate: () => void
  isGenerating: boolean
  setIsGenerating: (isGenerating: boolean) => void
}

export const useTemplate = create<TemplateState>()((set) => ({
  templateSelected: 'Minimal',
  contentTemplate: '',
  isGenerating: false,
  setTemplateSelected: (templateName: NameTemplate) => set({ templateSelected: templateName }),
  setContentTemplate: (content: string) =>
    set((prevContent) => ({ contentTemplate: prevContent.contentTemplate.concat(content) })),
  clearContentTemplate: () => set({ contentTemplate: '' }),
  setIsGenerating: (isGenerating) => set({ isGenerating })
}))
