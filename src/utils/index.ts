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

export const getTextWithoutExtraLines = ({ text }: { text: string }) => {
  return text.replace(/\n\s*\n/g, '\n')
}
