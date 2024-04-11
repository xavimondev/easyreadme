import { NodeViewWrapper } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { findSection } from '@/utils/section'

function Gallery({ data }: { data: any }) {
  const { repository, owner } = data
  return (
    <a href={`https://github.com/${owner}/${repository}/graphs/contributors`}>
      <img src={`https://contrib.rocks/image?repo=${owner}/${repository}`} alt='Contributors' />
    </a>
  )
}

// const CONTRIBUTORS_PER_ROW = 7
// function Table({ data }: { data: any }) {
//   const { listContributors, repository } = data
//   const rows = groupItems({ data: listContributors, groupSize: CONTRIBUTORS_PER_ROW })
//   return (
//     <table className='border border-solid border-gray-500 text-center w-full'>
//       <tbody>
//         {rows.map((data: any, index: number) => {
//           return (
//             <tr className='-my-2' key={index}>
//               {data.map((contributor: any) => {
//                 const { username, avatar, profileUrl, contributions } = contributor
//                 const contributionsText = contributions > 1 ? 'contributions' : 'contribution'
//                 return (
//                   <td key={username} className='-my-1 w-auto border' colSpan={1} rowSpan={1}>
//                     <p>
//                       <a
//                         target='_blank'
//                         rel='noopener noreferrer nofollow'
//                         className='text-blue-500 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-400 no-underline hover:underline hover:underline-offset-2 transition-colors cursor-pointer'
//                         href={profileUrl}
//                       >
//                         <img
//                           className='inline !m-0'
//                           src={avatar}
//                           alt={username}
//                           width='80px;'
//                           contentEditable='false'
//                           draggable='true'
//                         />
//                         <br />
//                         <strong>{username}</strong>{' '}
//                       </a>
//                       <br />
//                       <a
//                         target='_blank'
//                         rel='noopener noreferrer nofollow'
//                         className='text-blue-500 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-400 no-underline hover:underline hover:underline-offset-2 transition-colors cursor-pointer'
//                         href={`https://github.com/${username}/${repository}/commits?author=${username}`}
//                       >
//                         {contributions} {contributionsText}
//                       </a>
//                     </p>
//                   </td>
//                 )
//               })}
//             </tr>
//           )
//         })}
//       </tbody>
//     </table>
//   )
// }

export function Contributors(props: any) {
  const { node } = props
  const { attrs } = node
  const { data } = attrs
  const nodeName = node.type.name as NodeName
  const section = findSection({ section: nodeName })

  return (
    <NodeViewWrapper as='div'>
      <div className='relative group'>
        <div
          className='!outline-none content'
          contentEditable={true}
          suppressContentEditableWarning={true}
        >
          <h2>{section?.name}</h2>
          <Gallery data={data} />
        </div>
      </div>
    </NodeViewWrapper>
  )
}
