import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'

const lowlight = createLowlight(common)

const CodeBlockLowSyntax = CodeBlockLowlight.configure({
  lowlight
})

export default CodeBlockLowSyntax
