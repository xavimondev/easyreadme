import Image from 'next/image'

type StickerFeatureProps = {
  title: string
  url: string
}

export function StickerFeature({ title, url }: StickerFeatureProps) {
  return (
    <Image
      alt={title}
      src={url}
      className='object-cover size-12 2xl:size-16'
      width={64}
      height={64}
    />
  )
}
