import { useState } from 'react'
import { LIST_BADGES } from '@/badges'
import { DEFAULT_REPOSITORY_DATA } from '@/default-git-data'
import { Plus } from 'lucide-react'

import { getPos } from '@/utils/tiptap'
import { useBuilder } from '@/store'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ComboboxBadges } from '@/components/combobox-badges'

type BadgeItemProps = {
  name: string
  url: string
  isGithub: boolean
}

function BadgeItem({ name, url, isGithub }: BadgeItemProps) {
  const { readmeEditor, gitRepositoryData } = useBuilder()
  const { owner, repoName } = gitRepositoryData ?? DEFAULT_REPOSITORY_DATA
  const badgeUrl = isGithub ? `${url}/${owner}/${repoName}` : url

  const addBadge = () => {
    const pos = getPos({
      editor: readmeEditor!
    })
    const endPos = pos - 1 < 0 ? 0 : pos - 2

    // TODO: endPos is being calculated by using a hacky subtraction...fix please
    readmeEditor?.chain().insertBadge({
      endPos,
      data: {
        label: name,
        url: badgeUrl
      }
    })
  }

  return (
    <div className='w-full flex border border-dashed border-gray-600/30 rounded-md items-center overflow-hidden h-8'>
      <div className='w-full border-none flex'>
        <span className='font-medium justify-center text-[0.77rem] ml-2'>{name}</span>
      </div>
      <Button
        size='icon'
        variant='ghost'
        className='rounded-none h-full border-none p-0 m-0'
        onClick={addBadge}
      >
        <Plus className='w-4 h-4' />
      </Button>
    </div>
  )
}

const defaultValues = LIST_BADGES.find((badge) => badge.id === 'frontend')!

export function BadgesOptions() {
  const [badgeOptionData, setBadgeOptionData] = useState(defaultValues)
  const isGithub = badgeOptionData.id === 'github'
  const listBadges = badgeOptionData.data

  return (
    <div className='w-full min-h-[265px]'>
      <ComboboxBadges setBadgeOptionData={setBadgeOptionData} />
      <Separator className='my-4' />
      <div className='grid gap-2 grid-cols-3 w-full'>
        {listBadges?.map(({ id, name, url }) => {
          return <BadgeItem key={id} name={name} url={url} isGithub={isGithub} />
        })}
      </div>
    </div>
  )
}
