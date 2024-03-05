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

export const addBreaklineBetweenBadges = ({ markdownContent }: { markdownContent: string }) => {
  const regex = /\)\s*(?=\!\[)/g
  const result = markdownContent.replace(regex, ')\n')
  return result
}

export const replaceBadgesMarkdownToHtml = ({ markdownContent }: { markdownContent: string }) => {
  // Regex to to get all string that have this pattern:![ALT](IMAGE)
  const regex = /!\[Badge(.*?)\]\((.*?)\)/g
  // List all strings that meet the given pattern
  const imageBlockMatches = markdownContent.match(regex)
  const imageBlock = imageBlockMatches ? imageBlockMatches.join('\n') : null
  if (!imageBlock) return markdownContent
  // Replace each string with tag img
  const replacedImages = imageBlock.replace(regex, '<img src="$2" alt="$1" />')
  // Wrapped all images into a <p> tag
  const wrappedInParagraph = `<p align="center">\n${replacedImages
    .split('\n')
    .filter((line) => line.trim() !== '')
    .map((line) => `  ${line}`)
    .join('\n')}\n</p>\n\n`.trim()
  // Update markdown content
  const resultBadges = markdownContent.replace(imageBlock, wrappedInParagraph)
  return resultBadges
}
