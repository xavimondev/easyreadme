import Table from '@tiptap/extension-table'
import { ReactNodeViewRenderer } from '@tiptap/react'

import { MagicTable } from './magic-table'

const CustomTable = Table.extend({
  addNodeView() {
    return ReactNodeViewRenderer(MagicTable, {
      contentDOMElementTag: 'tbody'
    })
  }
})

export default CustomTable
