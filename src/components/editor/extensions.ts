import CodeBlock from '@tiptap/extension-code-block'
import Heading from '@tiptap/extension-heading'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Paragraph from '@tiptap/extension-paragraph'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TextAlign from '@tiptap/extension-text-align'
import StarterKit from '@tiptap/starter-kit'
import { Markdown } from 'tiptap-markdown'

import CustomTable from './core-nodes/table'

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

const CustomParagraph = Paragraph.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      align: {
        default: null
      }
    }
  }
})

export const DEFAULT_EXTENSIONS = [
  StarterKit.configure({
    codeBlock: false,
    heading: false,
    paragraph: false,
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
    transformPastedText: true,
    transformCopiedText: true
  }),
  CustomTable,
  TableRow.configure({
    HTMLAttributes: {
      class: 'w-full text-gray-500 dark:text-gray-300 [&_p]:m-1'
    }
  }),
  TableHeader.configure({
    HTMLAttributes: {
      class: 'font-bold border-2 dark:border-neutral-700 !px-4 !py-2'
    }
  }),
  CustomTableCell.configure({
    HTMLAttributes: {
      class: 'border-2 dark:border-neutral-700 !px-4 !py-2'
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
        'text-blue-500 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-400 no-underline hover:underline hover:underline-offset-2 transition-colors cursor-pointer'
    }
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph']
  }),
  Heading.configure({
    HTMLAttributes: {
      spellcheck: 'false'
    }
  }),
  CustomParagraph
]
