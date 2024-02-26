import { Dispatch, SetStateAction } from 'react'

import { TableSelector } from './table-selector'

type SelectorsProps = {
  x0: number
  y0: number
  x1: number
  y1: number
  setType: Dispatch<SetStateAction<'row' | 'col' | undefined>>
  setCoords: Dispatch<
    SetStateAction<
      | {
          x: number
          y: number
        }
      | undefined
    >
  >
}

export function Selectors({ x0, y0, x1, y1, setType, setCoords }: SelectorsProps) {
  return (
    <>
      {y0 !== 0 ? (
        <TableSelector
          style={{
            top: `${y0}px`,
            left: `${x0}px`
          }}
          showCommandSelector={() => {
            setType('row')
            setCoords({
              x: 6,
              y: y0 + 18
            })
          }}
        />
      ) : null}
      {x1 !== 0 ? (
        <TableSelector
          style={{
            top: `${y1}px`,
            left: `${x1}px`,
            transform: 'rotate(90deg)'
          }}
          showCommandSelector={() => {
            setType('col')
            setCoords({
              x: x1 + 12,
              y: 4
            })
          }}
        />
      ) : null}
    </>
  )
}
