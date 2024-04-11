import { README_SECTIONS_DATA } from '@/sections'

import { NodeName } from '@/types/builder'

export const findSection = ({ section }: { section: NodeName }) => {
  return README_SECTIONS_DATA.find((sec) => sec.id === section)
}
