import { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import { validateImage } from '@/utils'
import { Link } from 'lucide-react'
import { z } from 'zod'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const schema = z.object({
  imageUrl: z.string().url('This is not a valid url.')
})

type FormImageUrlProps = {
  imageUrl: string
  setImageUrl: Dispatch<SetStateAction<string>>
}

export function FormImageUrl({ imageUrl, setImageUrl }: FormImageUrlProps) {
  const [error, setError] = useState<string>('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const imageUrl = formData.get('imageUrl') as string
    const validatedFields = schema.safeParse({
      imageUrl
    })

    if (!validatedFields.success) {
      const errors = validatedFields.error.flatten().fieldErrors
      const errorMessage = errors.imageUrl![0]
      setError(errorMessage)
      return
    }

    try {
      const res = await validateImage({ imageUrl })
      if (res === 'ok') {
        setImageUrl(imageUrl)
        setError('')
      }
    } catch (error) {
      setError(error as string)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='secondary' size='icon'>
          <Link className='size-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[400px]' align='end' alignOffset={10}>
        <div className='grid gap-4'>
          <div className='space-y-2'>
            <h4 className='font-medium leading-none'>Add an image from URL</h4>
          </div>
          <form className='flex flex-col gap-2 w-full' noValidate onSubmit={handleSubmit}>
            <Label
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only text-right'
              htmlFor='imageUrl'
            ></Label>
            {/* invalid:[&:not(:focus)]:border-red-400 invalid:[&:not(:focus)]:text-red-400 peer */}
            <Input
              type='url'
              defaultValue={imageUrl}
              id='imageUrl'
              name='imageUrl'
              className={cn(
                'h-8',
                error && 'border-red-400 text-red-400 focus:border-red-400 focus:ring-red-400'
              )}
              placeholder='https://mydomain/image.png'
            />
            {/* hidden peer-invalid:block */}
            <span className={cn('mt-0.5 text-sm text-red-400 hidden', error && 'block')}>
              {error}
            </span>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  )
}
