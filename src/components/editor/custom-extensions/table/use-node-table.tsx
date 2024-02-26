import { useCallback, useState } from 'react'

// TODO: This should be calculate dynamically
const SELECTOR_HEIGHT = 24
const SELECTOR_WIDTH = 16
const DEFAULT_X0 = -6
const DEFAULT_Y1 = -12

export function useNodeTable() {
  const [coords, setCoords] = useState({
    x0: DEFAULT_X0,
    y0: 0,
    x1: 0,
    y1: DEFAULT_Y1
  })
  const [type, setType] = useState<'row' | 'col' | undefined>(undefined)
  const [coordsCommandSelector, setCoordsCommandSelector] = useState<
    { x: number; y: number } | undefined
  >(undefined)

  const handleHover = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      // selectors should only show up as long as there's no a command window opens
      if (coordsCommandSelector) return

      const target = event.nativeEvent.target as HTMLElement
      if (target.tagName.toLowerCase() === 'td' || target.tagName.toLowerCase() === 'th') {
        let sumCellsHeight = 0
        let sumCellsWidth = 0
        const tableElement = target.closest('table')
        if (!tableElement) return null

        // Calculating vertical selector. This is for rows
        // @ts-ignore
        const rowIndex = event.target.parentElement.rowIndex
        const posRow = rowIndex === 0 ? 1 : rowIndex + 1
        if (posRow > 1) {
          for (let i = 0; i < posRow - 1; i++) {
            const rowHTML = tableElement.rows[i].cells[0]
            const height = rowHTML.getBoundingClientRect().height
            sumCellsHeight += height
          }
        }
        // @ts-ignore
        const cellDimensions = target.parentElement.cells[0].getBoundingClientRect()
        const cellSelectedHeight = cellDimensions.height / 2

        const y0 = SELECTOR_HEIGHT + sumCellsHeight + cellSelectedHeight - 36

        // Calculating horizontal selector. This is for columns
        // @ts-ignore
        const columnIndex = target.cellIndex
        const posColumn = columnIndex === 0 ? 1 : columnIndex + 1
        if (posColumn > 1) {
          for (let i = 0; i < posColumn - 1; i++) {
            const colHTML = tableElement.rows[0].cells[i]
            const width = Math.floor(colHTML.getBoundingClientRect().width)
            sumCellsWidth += width
          }
        }

        // @ts-ignore
        const cellColDimensions = tableElement.rows[0].cells[columnIndex].getBoundingClientRect()
        const cellSelectedWidth = Math.floor(cellColDimensions.width) / 2
        const x1 = Math.floor(SELECTOR_WIDTH + sumCellsWidth + cellSelectedWidth - 22)
        setCoords((prevCoords) => ({
          ...prevCoords,
          y0,
          x1
        }))
      }
    },
    [coordsCommandSelector]
  )

  const handleOut = useCallback(() => {
    setCoords((prevCoords) => ({
      ...prevCoords,
      y0: 0,
      x1: 0
    }))
  }, [])

  return {
    coords,
    handleHover,
    handleOut,
    setType,
    type,
    coordsCommandSelector,
    setCoordsCommandSelector
  }
}
