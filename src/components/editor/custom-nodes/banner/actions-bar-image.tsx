import { FormImageUrl } from './form-image-url'

type ActionsBarImageProps = {
  setImageUrl: (imgUrl: string) => void
}

export function ActionsBarImage({ setImageUrl }: ActionsBarImageProps) {
  return (
    <div className='flex gap-2 items-center top-2 right-2 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out'>
      <FormImageUrl setImageUrl={setImageUrl} />
    </div>
  )
}
