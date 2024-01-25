import { NodeViewWrapper } from '@tiptap/react'

import { NodeName } from '@/types/builder'
import { ViewProps } from '@/types/view'

import { LANGUAGES_SETUP } from '@/constants'
import { getSetupCommands } from '@/utils/commands'
import { findSection } from '@/utils/section'
import { useBuilder } from '@/store'
import { ActionsBar } from '@/components/editor/views/actions-bar'

export function RunLocally({ deleteNode, node }: ViewProps) {
  const updateSection = useBuilder((store) => store.updateSection)
  const { attrs, type } = node
  const mainLanguage = attrs.mainLanguage
  const nodeName = type.name as NodeName
  const section = findSection({ section: nodeName })

  const setup = LANGUAGES_SETUP.find(({ language }) => language === mainLanguage)
  const secondStep = setup
    ? getSetupCommands({ commands: setup.commands['install'] })
    : `Insert INSTALL commands`
  const thirdStep = setup
    ? getSetupCommands({ commands: setup.commands['run'] })
    : `Insert RUN commands`
  return (
    <NodeViewWrapper as='div'>
      <div className='relative group'>
        <div className='!outline-none' contentEditable={true} suppressContentEditableWarning={true}>
          <h2>{section?.name}</h2>
          <ul
            className='list-decimal list-outside leading-4 dark:marker:text-white marker:text-black'
            data-tight='true'
          >
            <li>
              <p>Clone {`supaplay`} repository:</p>
              <pre>
                <code className='language-markdown !outline-none'>{`git clone https://github.com/xavimondev/supaplay`}</code>
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
            updateSection(nodeName)
            deleteNode()
          }}
        />
      </div>
    </NodeViewWrapper>
  )
}