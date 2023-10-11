import StarterKit from '@tiptap/starter-kit'
import { Markdown } from 'tiptap-markdown'
import Image from '@tiptap/extension-image'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Link from '@tiptap/extension-link'
import CodeBlock from '@tiptap/extension-code-block'
import TextAlign from '@tiptap/extension-text-align'
import Heading from '@tiptap/extension-heading'

const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null
      },
      height: {
        default: null
      },
      srcset: {
        default: null
      },
      sizes: {
        default: null
      },
      style: {
        default: null
      }
    }
  }
})

const CustomTable = Table.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: null
      }
    }
  }
})

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: null
      }
    }
  }
})
export const DEFAULT_EXTENSIONS = [
  StarterKit.configure({
    codeBlock: false,
    heading: false,
    code: {
      HTMLAttributes: {
        spellcheck: 'false'
      }
    },
    orderedList: {
      HTMLAttributes: {
        class: 'list-decimal list-outside leading-4'
      }
    },
    bulletList: {
      HTMLAttributes: {
        class: 'list-disc list-outside leading-4'
      }
    },
    blockquote: {
      HTMLAttributes: {
        class: 'leading-6',
        spellcheck: 'false'
      }
    }
  }),
  Markdown.configure({
    html: true,
    tightLists: false, // No <p> inside <li> in markdown output
    tightListClass: 'tight', // Add class to <ul> allowing you to remove <p> margins when tight
    bulletListMarker: '-', // <li> prefix in markdown output
    transformPastedText: true,
    transformCopiedText: true,
    breaks: false
  }),
  CustomTable.configure({
    resizable: false,
    HTMLAttributes: {
      class: '-mb-1'
    }
  }),
  TableRow.configure({
    HTMLAttributes: {
      class: '-my-2'
    }
  }),
  TableHeader.configure({
    HTMLAttributes: {
      class: 'text-base'
    }
  }),
  CustomTableCell.configure({
    HTMLAttributes: {
      class: '-my-1'
    }
  }),
  CodeBlock,
  CustomImage.configure({
    inline: true,
    HTMLAttributes: {
      class: 'inline !m-0'
    }
  }),
  Link.configure({
    HTMLAttributes: {
      class:
        'text-blue-500 hover:text-blue-600 dark:text-blue-300 hover:text-blue-400 no-underline hover:underline hover:underline-offset-2 transition-colors cursor-pointer'
    }
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph']
  }),
  Heading.configure({
    HTMLAttributes: {
      spellcheck: 'false'
    }
  })
]
