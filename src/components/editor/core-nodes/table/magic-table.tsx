import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'

import { CommandSelector } from './command-selector'
import { Selectors } from './selectors'
import { useNodeTable } from './use-node-table'

export function MagicTable() {
  const {
    coords,
    handleHover,
    handleOut,
    setType,
    type,
    coordsCommandSelector,
    setCoordsCommandSelector
  } = useNodeTable()

  return (
    <NodeViewWrapper className='w-full relative' onMouseLeave={handleOut}>
      {coordsCommandSelector && (
        <CommandSelector
          type={type}
          coordsCommandSelector={coordsCommandSelector}
          setCoordsCommandSelector={setCoordsCommandSelector}
        />
      )}
      <Selectors {...coords} setType={setType} setCoords={setCoordsCommandSelector} />
      <NodeViewContent
        className='w-full'
        as='table'
        onMouseOver={handleHover}
        tabIndex={0}
        onFocus={handleOut}
      ></NodeViewContent>
    </NodeViewWrapper>
  )
}
