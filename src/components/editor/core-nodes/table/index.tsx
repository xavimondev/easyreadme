import { TableSelector } from './table-selector'
import { useNodeTable } from './use-node-table'

export function Table() {
  const { coords, tableRef, handleHover, handleOut } = useNodeTable()
  const { x0, y0, x1, y1 } = coords

  return (
    // onMouseOut={handleOut}
    <div className='relative w-full' onMouseOver={handleHover}>
      {x0 !== 0 && y0 !== 0 ? <TableSelector x={x0} y={y0} /> : null}
      {x1 !== 0 && y1 !== 0 ? <TableSelector x={x1} y={y1} /> : null}
      <table
        className='w-full text-x rtl:text-right text-gray-500 dark:text-gray-300 absolute'
        ref={tableRef}
        tabIndex={0}
        onFocus={handleOut}
      >
        <thead className='font-bold'>
          <tr className='[&>th]:border-2 [&>th]:dark:border-neutral-700 [&>th]:!px-5 [&>th]:!py-2 [&>th]:!m-0 relative'>
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr className='[&>td]:border-2 [&>td]:dark:border-neutral-700 [&>td]:!px-5 [&>td]:!py-2'>
            <td>
              <code>api_key</code>
            </td>
            <td>
              <code>string</code>
            </td>
            <td>A brief description</td>
          </tr>
          <tr className='[&>td]:border-2 [&>td]:dark:border-neutral-700 [&>td]:!px-5 [&>td]:!py-2'>
            <td>
              <code>api_key</code>
            </td>
            <td>
              <code>string</code>
            </td>
            <td>A brief description</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
