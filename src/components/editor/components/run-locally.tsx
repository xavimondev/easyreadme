import { NodeViewWrapper } from '@tiptap/react'
import { ActionsBar } from './actions-bar'
import { LANGUAGES_SETUP, README_SECTIONS } from '@/constants'
import { getSetupCommands } from '@/utils/commands'

export function RunLocally({ deleteNode, node }: any) {
  const { attrs } = node
  const mainLanguage = attrs.mainLanguage

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
          <h2>{README_SECTIONS['run-locally']}</h2>
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
        <ActionsBar removeSection={deleteNode} />
      </div>
    </NodeViewWrapper>
  )
}
