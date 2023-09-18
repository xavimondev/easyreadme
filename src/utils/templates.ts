import {
  getBanner,
  getTechStack,
  getOverview,
  getRunningLocally,
  getEnvironmentVariablesGuide
} from './template-sections'

export const getTemplate = (template: string) => {
  if (template === 'Minimal')
    return getMinimal({ urlRepository: 'https://github.com/xavimondev/boostgrammar.io/' })
  else return '# Another template'
}

const getMinimal = ({ urlRepository }: { urlRepository: string }) => {
  return `
  ${getBanner({
    urlRepository
  })}

  ${getOverview({
    urlRepository
  })}

  ${getTechStack({
    urlRepository
  })}

  ${getEnvironmentVariablesGuide({
    urlRepository
  })}

  ${getRunningLocally({ urlRepository })}
`.trim()
}
