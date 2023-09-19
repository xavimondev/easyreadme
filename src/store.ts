import { create } from 'zustand'

type TemplateState = {
  templateSelected: string | undefined
  setTemplateSelected: (templateName: string) => void
  contentTemplate: string
  setContentTemplate: (content: string) => void
}

export const useTemplate = create<TemplateState>()((set) => ({
  templateSelected: undefined,
  contentTemplate: '',
  setTemplateSelected: (templateName) => set({ templateSelected: templateName }),
  setContentTemplate: (content: string) =>
    set((prevContent) => ({ contentTemplate: prevContent.contentTemplate.concat(content) }))
}))
