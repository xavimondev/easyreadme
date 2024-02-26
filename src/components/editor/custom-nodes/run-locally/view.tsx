import { NodeViewWrapper } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { LANGUAGES_SETUP } from '@/constants'
import { getSetupCommands } from '@/utils/commands'
import { findSection } from '@/utils/section'
import { useBuilder } from '@/store'
import { useNode } from '@/hooks/use-node'
import { ActionsBar } from '@/components/editor/actions-bar'

export function RunLocally(props: any) {
  const { node, deleteNode } = props
  const { removeSectionFromTableOfContents } = useBuilder((store) => store)
  const { attrs, type } = node
  const { mainLanguage, repoName, urlRepository } = attrs.data
  const nodeName = type.name as NodeName
  const section = findSection({ section: nodeName })

  const setup = LANGUAGES_SETUP.find(({ language }) => language === mainLanguage)
  const secondStep = setup
    ? getSetupCommands({ commands: setup.commands['install'] })
    : `Insert INSTALL commands`
  const thirdStep = setup
    ? getSetupCommands({ commands: setup.commands['run'] })
    : `Insert RUN commands`

  useNode(props)

  return (
    <NodeViewWrapper as='div'>
      <div className='relative group'>
        <div
          className='!outline-none content'
          contentEditable={true}
          suppressContentEditableWarning={true}
        >
          <h2>{section?.name}</h2>
          <ul
            className='list-decimal list-outside leading-4 dark:marker:text-white marker:text-black'
            data-tight='true'
          >
            <li>
              <p>Clone {repoName} repository:</p>
              <pre>
                <code className='language-markdown !outline-none'>{`git clone ${urlRepository}`}</code>
              </pre>
            </li>
            <li>
              <p>Install the dependencies with one of the package managers listed below:</p>
              <pre>
                <code className='language-markdown !outline-none'>{secondStep}</code>
              </pre>
            </li>
            <li>
              <p>Start the development mode:</p>
              <pre>
                <code className='language-markdown !outline-none'>{thirdStep}</code>
              </pre>
            </li>
          </ul>
        </div>
        <ActionsBar
          removeSection={() => {
            deleteNode()
            removeSectionFromTableOfContents(nodeName)
          }}
        />
      </div>
    </NodeViewWrapper>
  )
}
