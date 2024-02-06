import { useEffect } from 'react'

export function useNode(props: any) {
  const { editor, getPos, updateAttributes } = props

  useEffect(() => {
    setTimeout(() => {
      const staticHtml = editor.view.nodeDOM(getPos()).querySelector('.content').innerHTML
      updateAttributes({ html: staticHtml })
    }, 100)
  }, [])
}
