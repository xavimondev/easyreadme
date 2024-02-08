'use client'

import { EditorContent, useEditor } from '@tiptap/react'

import { useBuilder } from '@/store'
import { DEFAULT_EXTENSIONS } from '@/components/editor/extensions'
import Acknowledgments from '@/components/editor/nodes/acknowledgments'
import Alert from '@/components/editor/nodes/alert'
import Badge from '@/components/editor/nodes/badge'
import Banner from '@/components/editor/nodes/banner'
import Changelog from '@/components/editor/nodes/changelog'
import Commands from '@/components/editor/nodes/commands'
import ContributorsNode from '@/components/editor/nodes/contributors'
import Deploy from '@/components/editor/nodes/deploy'
import EnvVariablesGuide from '@/components/editor/nodes/env-variables-guide'
import Faq from '@/components/editor/nodes/faq'
import License from '@/components/editor/nodes/license'
import Overview from '@/components/editor/nodes/overview'
import Prerequisites from '@/components/editor/nodes/prerequisites'
import ProjectStructure from '@/components/editor/nodes/project-structure'
import ProjectSummary from '@/components/editor/nodes/project-summary'
import Roadmap from '@/components/editor/nodes/roadmap'
import RunLocally from '@/components/editor/nodes/run-locally'
import TableContents from '@/components/editor/nodes/table-contents'
import TechStack from '@/components/editor/nodes/tech-stack'

export function CustomEditor() {
  const setReadmeEditor = useBuilder((store) => store.setReadmeEditor)
  const editor = useEditor({
    editable: true,
    autofocus: 'start',
    injectCSS: false,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose-base prose-neutral dark:prose-invert max-w-none font-default focus:outline-none h-[calc(100vh-405px)] md:h-[calc(100vh-106px)] overflow-y-auto scrollbar-hide'
      }
    },
    extensions: [
      ...DEFAULT_EXTENSIONS,
      Roadmap,
      Banner,
      Acknowledgments,
      RunLocally,
      License,
      ProjectStructure,
      Badge,
      Changelog,
      Prerequisites,
      Faq,
      Commands,
      Deploy,
      Overview,
      TechStack,
      ProjectSummary,
      EnvVariablesGuide,
      TableContents,
      ContributorsNode,
      Alert
    ],
    onCreate: ({ editor }) => {
      setReadmeEditor(editor)
    }
  })

  return (
    <div className='border rounded-r-md border-black dark:border-white/20 w-full p-9 bg-white/95 dark:bg-neutral-800/20 relative h-[calc(100vh-366px)] md:h-[calc(100vh-63px)]'>
      <EditorContent editor={editor} className='w-full' />
    </div>
  )
}
