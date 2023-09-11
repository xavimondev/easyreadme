import { create } from 'zustand'
import { getTemplate } from './utils/templates'

type TemplateData = { name: string; content: string }
type TemplateState = {
  templateSelected: TemplateData | undefined
  setTemplate: (templateName: string) => void
}

export const useTemplate = create<TemplateState>()((set) => ({
  templateSelected: undefined,
  setTemplate: (templateName) => {
    const content = getTemplate(templateName)
    const template: TemplateData = {
      name: templateName,
      content
    }
    set({ templateSelected: template })
  }
}))
