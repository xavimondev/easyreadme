import { useCallback, useRef, useState } from 'react'

const BUG_HEIGHT = 24
const BUG_WIDTH = 16
const DEFAULT_X0 = -6
const DEFAULT_Y1 = 14

export function useNodeTable() {
  const [coords, setCoords] = useState({
    x0: DEFAULT_X0,
    y0: 0,
    x1: 0,
    y1: DEFAULT_Y1
  })
  const tableRef = useRef<HTMLTableElement | null>(null)

  const handleHover = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement
    if (target.tagName.toLowerCase() === 'td' || target.tagName.toLowerCase() === 'th') {
      let sumCellsHeight = 0
      let sumCellsWidth = 0
      // Calculating y0
      // @ts-ignore
      const rowIndex = event.target.parentElement.rowIndex
      const posRow = rowIndex === 0 ? 1 : rowIndex + 1
      if (posRow > 1) {
        for (let i = 0; i < posRow - 1; i++) {
          const rowHTML = tableRef.current?.rows[i].cells[0]
          const height = rowHTML!.getBoundingClientRect().height
          sumCellsHeight += height
        }
      }
      // @ts-ignore
      const cellDimensions = target.parentElement.cells[0].getBoundingClientRect()
      const cellSelectedHeight = cellDimensions.height / 2

      const y0 = BUG_HEIGHT + sumCellsHeight + cellSelectedHeight - 6

      // Calculatin x1
      // @ts-ignore
      const columnIndex = target.cellIndex
      const posColumn = columnIndex === 0 ? 1 : columnIndex + 1
      if (posColumn > 1) {
        for (let i = 0; i < posColumn - 1; i++) {
          const colHTML = tableRef.current?.rows[0].cells[i]
          const width = Math.floor(colHTML!.getBoundingClientRect().width)
          sumCellsWidth += width
        }
      }

      // @ts-ignore
      const cellColDimensions = tableRef.current!.rows[0].cells[columnIndex].getBoundingClientRect()
      const cellSelectedWidth = Math.floor(cellColDimensions.width) / 2
      const x1 = Math.floor(BUG_WIDTH + sumCellsWidth + cellSelectedWidth - 23)
      setCoords((prevCoords) => ({
        ...prevCoords,
        y0,
        x1
      }))
    }
  }, [])

  const handleOut = () => {
    setCoords((prevCoords) => ({
      ...prevCoords,
      y0: 0,
      x1: 0
    }))
  }

  return {
    coords,
    tableRef,
    handleHover,
    handleOut
  }
}
