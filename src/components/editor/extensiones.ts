import StarterKit from '@tiptap/starter-kit'
import { Markdown } from 'tiptap-markdown'
import Image from '@tiptap/extension-image'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Link from '@tiptap/extension-link'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import TextAlign from '@tiptap/extension-text-align'
import Details from '@tiptap-pro/extension-details'
import DetailsSummary from '@tiptap-pro/extension-details-summary'
import DetailsContent from '@tiptap-pro/extension-details-content'
import Heading from '@tiptap/extension-heading'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { common, createLowlight } from 'lowlight'

const lowlight = createLowlight(common)
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

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
  Table.configure({
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
  TableCell.configure({
    HTMLAttributes: {
      class: '-my-1'
    }
  }),
  CodeBlockLowlight.configure({
    lowlight
  }),
  CustomImage.configure({
    inline: true,
    HTMLAttributes: {
      class: 'inline !m-0'
    }
  }),
  Link.configure({
    HTMLAttributes: {
      class:
        'text-blue-300 hover:text-blue-400 no-underline hover:underline hover:underline-offset-2 transition-colors cursor-pointer'
    }
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph']
  }),
  Details.configure({
    HTMLAttributes: {
      class: 'details flex gap-2 list-none items-center'
    }
  }),
  DetailsSummary.configure({
    HTMLAttributes: {
      class: 'select-none'
    }
  }),
  DetailsContent,
  Heading.configure({
    HTMLAttributes: {
      spellcheck: 'false'
    }
  })
]
