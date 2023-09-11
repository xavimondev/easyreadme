import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { GitIc } from '@/components/icons'
import { ListTemplates } from '@/components/list-templates'

export function Sidebar() {
  return (
    <div className='max-w-[350px] h-[calc(100vh-35px)] overflow-y-auto scrollbar-hide'>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>Source</CardTitle>
        </CardHeader>
        <CardContent>
          <form className='flex flex-col gap-2'>
            <div className='relative flex w-full items-center'>
              <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-white/40'>
                <GitIc className='w-4 h-4' />
              </div>
              <Input
                type='url'
                autoComplete='off'
                autoCorrect='off'
                autoCapitalize='off'
                required
                name='urlRepository'
                className='h-11 pl-9 focus-visible:border-gray-500 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60'
                placeholder='https://github.com/xavimondev/readme-creator'
              />
            </div>
            <Button variant='secondary' type='submit'>
              Sent
            </Button>
          </form>
          <div className='mt-7 w-full h-full'>
            <span className='text-accent-foreground'>Templates</span>
            <ListTemplates />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
