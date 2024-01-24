import { NodeName } from '@/types/builder'

import { README_SECTIONS_DATA } from '@/constants'

export const findSection = ({ section }: { section: NodeName }) => {
  return README_SECTIONS_DATA.find((sec) => sec.id === section)
}
