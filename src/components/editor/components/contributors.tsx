import { NodeViewWrapper } from '@tiptap/react'
import { groupItems } from '@/utils/groupItems'
import { README_SECTIONS } from '@/constants'
import { ActionsBar } from './actions-bar'

export function ContributorsGallery({ deleteNode, node }: any) {
  const { attrs } = node
  const repository = attrs.repository
  const owner = attrs.owner

  return (
    <NodeViewWrapper as='div'>
      <div className='relative group'>
        <div className='!outline-none' contentEditable={true} suppressContentEditableWarning={true}>
          <h2>{README_SECTIONS['contributors']}</h2>
          <a href={`https://github.com/${owner}/${repository}/graphs/contributors`}>
            <img src={`https://contrib.rocks/image?repo=${owner}/${repository}`} />
          </a>
        </div>
        <ActionsBar removeSection={deleteNode} />
      </div>
    </NodeViewWrapper>
  )
}
const contributorsPerRow = 7
export function ContributorsTable({ deleteNode, node }: any) {
  const { attrs } = node
  const listContributors = attrs.listContributors
  const repository = attrs.repository
  const rows = groupItems({ data: listContributors, groupSize: contributorsPerRow })

  return (
    <NodeViewWrapper as='div'>
      <div className='relative group'>
        <div className='!outline-none' contentEditable={true} suppressContentEditableWarning={true}>
          <h2>{README_SECTIONS['contributors']}</h2>
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
        </div>
        <ActionsBar removeSection={deleteNode} />
      </div>
    </NodeViewWrapper>
  )
}
