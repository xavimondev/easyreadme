import { useCallback } from 'react'

import { useBuilder } from '@/store'

export function useSections() {
  const readmeEditor = useBuilder((store) => store.readmeEditor)

  const addBadge = useCallback(
    ({ endPos, data }: { endPos: number; data: any }) => {
      readmeEditor?.chain().insertBadge({
        endPos,
        data
      })
    },
    [readmeEditor]
  )

  return {
    addBadge
  }
}
