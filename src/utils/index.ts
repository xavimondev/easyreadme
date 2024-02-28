export const copyToClipboard = async (content: string) => {
  if (navigator.clipboard) navigator.clipboard.writeText(content)
}

export const isPath = (path: string) => {
  const pathSeparatorRegex = /[\\/]/
  return pathSeparatorRegex.test(path)
}

export const getPathFromUrl = ({ path }: { path: string }) => {
  const pathParts = path.split('/')
  return pathParts.slice(0, -1).join('/')
}

export const removeLeadingSpaces = ({ text }: { text: string }): string => {
  return text.replace(/^\s+/gm, '')
}

export const validateImage = ({ imageUrl }: { imageUrl: string }) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = imageUrl

    img.onload = () => {
      resolve('ok')
    }

    img.onerror = () => {
      img.onload = null
      img.onerror = null
      reject('The URL is not valid. Check the URL provided.')
    }
  })
}
