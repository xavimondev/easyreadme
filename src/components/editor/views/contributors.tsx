import { type Node } from '@tiptap/pm/model'
import { NodeViewWrapper } from '@tiptap/react'

import { ContributorOption } from '@/types/builder'

import { README_SECTIONS } from '@/constants'
import { groupItems } from '@/utils/groupItems'
import { useBuilder } from '@/store'
import { ActionsBar } from '@/components/editor/views/actions-bar'

function Gallery({ data }: { data: any }) {
  const { repository, owner } = data
  return (
    <a href={`https://github.com/${owner}/${repository}/graphs/contributors`}>
      <img src={`https://contrib.rocks/image?repo=${owner}/${repository}`} />
    </a>
  )
}

const CONTRIBUTORS_PER_ROW = 7
function Table({ data }: { data: any }) {
  const { listContributors, repository } = data
  const rows = groupItems({ data: listContributors, groupSize: CONTRIBUTORS_PER_ROW })
  return (
    <table className='border border-solid border-gray-500 text-center w-full'>
      <tbody>
        {rows.map((data: any, index: number) => {
          return (
            <tr className='-my-2' key={index}>
              {data.map((contributor: any) => {
                const { username, avatar, profileUrl, contributions } = contributor
                const contributionsText = contributions > 1 ? 'contributions' : 'contribution'
                return (
                  <td key={username} className='-my-1 w-auto border' colSpan={1} rowSpan={1}>
                    <p>
                      <a
                        target='_blank'
                        rel='noopener noreferrer nofollow'
                        className='text-blue-500 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-400 no-underline hover:underline hover:underline-offset-2 transition-colors cursor-pointer'
                        href={profileUrl}
                      >
                        <img
                          className='inline !m-0'
                          src={avatar}
                          alt={username}
                          width='80px;'
                          contentEditable='false'
                          draggable='true'
                        />
                        <br />
                        <strong>{username}</strong>{' '}
                      </a>
                      <br />
                      <a
                        target='_blank'
                        rel='noopener noreferrer nofollow'
                        className='text-blue-500 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-400 no-underline hover:underline hover:underline-offset-2 transition-colors cursor-pointer'
                        href={`https://github.com/${username}/${repository}/commits?author=${username}`}
                      >
                        {contributions} {contributionsText}
                      </a>
                    </p>
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

type ContributorsProps = {
  deleteNode: VoidFunction
  node: Node
}

export function Contributors({ deleteNode, node }: ContributorsProps) {
  const { attrs } = node
  const { type, data } = attrs
  const updateSection = useBuilder((store) => store.updateSection)
  const nodeName: any = node.type.name

  return (
    <NodeViewWrapper as='div'>
      <div className='relative group'>
        <div className='!outline-none' contentEditable={true} suppressContentEditableWarning={true}>
          <h2>{README_SECTIONS['contributors']}</h2>
          {type === '' ? null : type === ContributorOption.GALLERY ? (
            <Gallery data={data} />
          ) : (
            <Table data={data} />
          )}
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
