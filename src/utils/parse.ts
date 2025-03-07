export const parsePackageJson = ({ content }: { content: string }) => {
  try {
    const contentParsed = content.replaceAll('@', '')
    const dependenciesObj = JSON.parse(contentParsed)
    const dependenciesDev = dependenciesObj.devDependencies
      ? Object.keys(dependenciesObj.devDependencies)
      : []
    const dependencies = dependenciesObj.dependencies
      ? Object.keys(dependenciesObj.dependencies)
      : []
    return dependencies.concat(dependenciesDev).join('\n')
  } catch (error) {
    console.error(error)
    return ''
  }
}

export const parsePipFile = ({ content }: { content: string }) => {
  try {
    // Split the Pipfile content by lines
    const lines = content.split(/\r?\n/)
    // Regular expressions to match package names
    const packagePattern = /^\s*([\w.-]+)\s*=\s*["']([^"']+)["']\s*$/
    let inPackagesSection = false
    let inDevPackagesSection = false
    const packages = []
    // Iterate through the lines to find package names
    for (const line of lines) {
      if (line.trim() === '[packages]') {
        inPackagesSection = true
        inDevPackagesSection = false
      } else if (line.trim() === '[dev-packages]') {
        inPackagesSection = false
        inDevPackagesSection = true
      } else if (inPackagesSection || inDevPackagesSection) {
        const match = line.match(packagePattern)
        if (match) {
          const packageName = match[1]
          packages.push(packageName)
        }
      }
    }

    // Join the packages with line breaks
    const result = packages.join('\n')

    return result
  } catch (error) {
    console.error('Error processing the Pipfile:', error)
    return null
  }
}

export const parsePyProject = ({ content }: { content: string }) => {
  try {
    const lines = content.split('\n')
    const dependencies = []
    const devDependencies = []
    let inDependenciesSection = false
    let inDevDependenciesSection = false

    for (const line of lines) {
      const trimmedLine = line.trim()
      const isSectionHeader = trimmedLine.startsWith('[')

      if (isSectionHeader) {
        inDependenciesSection = trimmedLine === '[tool.poetry.dependencies]'
        inDevDependenciesSection = trimmedLine === '[tool.poetry.dev-dependencies]'
        continue
      }

      const [packageName, version] = trimmedLine.split('=')
      if (packageName && version) {
        if (inDependenciesSection) {
          dependencies.push(packageName.trim())
        } else if (inDevDependenciesSection) {
          devDependencies.push(packageName.trim())
        }
      }
    }

    const allDependencies = [...dependencies, ...devDependencies]
    return allDependencies.join('\n')
  } catch (error) {
    console.error('Error processing pyproject.toml:', error)
    return null
  }
}

export const parseRequirementsTxt = ({ content }: { content: string }) => {
  try {
    const lines = content.split('\n').filter((line) => line.trim() !== '')
    const dependencies = lines.map((line) => line.split('=')[0].trim())
    const result = dependencies.join('\n')

    return result
  } catch (error) {
    console.error('Error processing content:', error)
    return null
  }
}

export const parseBuildGradle = ({ content }: { content: string }) => {
  try {
    const dependenciesBlockRegex = /dependencies\s*{([^}]+)}/g
    const dependencyRegex = /['"](.*?)['"]/g
    const dependencies = []
    let dependenciesBlockMatch

    while ((dependenciesBlockMatch = dependenciesBlockRegex.exec(content)) !== null) {
      const dependenciesBlockContent = dependenciesBlockMatch[1]
      let match

      while ((match = dependencyRegex.exec(dependenciesBlockContent)) !== null) {
        dependencies.push(match[1])
      }
    }
    return dependencies.length === 0 ? '' : dependencies.join('\n')
  } catch (error) {
    console.error(error)
    return null
  }
}

export const parsePom = ({ content }: { content: string }) => {
  try {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(content, 'application/xml')
    const dependencyElements = xmlDoc.querySelectorAll('dependencies dependency')

    const dependencies: string[] = []

    dependencyElements.forEach((dependencyElement) => {
      const artifactIdElement = dependencyElement.querySelector('artifactId')
      if (artifactIdElement) {
        dependencies.push(artifactIdElement.textContent as string)
      }
    })

    const result = dependencies.join('\n')

    return result
  } catch (error) {
    console.error(error)
    return null
  }
}

export const parseComposerJson = ({ content }: { content: string }) => {
  try {
    const dependenciesObj = JSON.parse(content)
    const dependencies = dependenciesObj.require ? Object.keys(dependenciesObj.require) : []
    const dependenciesDev = dependenciesObj['require-dev']
      ? Object.keys(dependenciesObj['require-dev'])
      : []
    return dependencies.concat(dependenciesDev).join('\n')
  } catch (error) {
    console.error(error)
    return null
  }
}

export const parseGoMod = ({ content }: { content: string }) => {
  try {
    const regexRequire = /require\s+\(([\s\S]*?)\)/
    const matchRequire = content.match(regexRequire)

    return matchRequire ? matchRequire[1].trim().replaceAll(' ', '') : ''
  } catch (error) {
    console.error(error)
    return null
  }
}

export const parseCargo = ({ content }: { content: string }) => {
  try {
    const regex = /\[(\w+\.)?dependencies\]\s*([\s\S]*?)(?=(\[\w+\.?\w*\])|$)/g
    const dependencies: string[] = []
    let match

    while ((match = regex.exec(content)) !== null) {
      const dependencyBlock = match[2]
      const dependencyLines = dependencyBlock.split('\n')

      dependencyLines.forEach((line) => {
        line = line.trim()
        // Ignore comments and empty lines
        if (line && !line.startsWith('#')) {
          const dependency = line.split('=')[0].trim()
          dependencies.push(dependency)
        }
      })
    }

    return dependencies.join('\n')
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getWorkspacePnpmLock = ({ content }: { content: string }) => {
  try {
    // TODO: improve these regular expressions
    const packagesBlockRegex = /packages:\s*\n((?:\s*-\s*["'].*?["']\s*\n?)*)/
    const packageItemRegex = /-\s*["']([^"']+)["']/g

    const packagesBlockMatch = content.match(packagesBlockRegex)
    if (!packagesBlockMatch) {
      return []
    }

    const packagesBlockContent = packagesBlockMatch[1]
    const packageMatches = packagesBlockContent.matchAll(packageItemRegex)
    const packages: string[] = []

    // @ts-ignore
    for (const match of packageMatches) {
      const packageName = match[1]

      if (!packageName.startsWith('!') && !packageName.startsWith('*')) {
        const packageFormatted = packageName.replaceAll('*', '') as string
        const exists = packages.find((pck) => packageFormatted.startsWith(pck))
        if (!exists) {
          packages.push(packageFormatted)
        }
      }
    }

    return packages
  } catch (error) {
    console.error(error)
  }
}

export const getWorkspacePackageJson = ({ content }: { content: string }): string[] | undefined => {
  // TODO: validate when there's an object inside workspaces
  const packages: string[] = []

  try {
    const contentParsed = JSON.parse(content)
    const workspaces: string[] | undefined = contentParsed.workspaces

    if (!workspaces || workspaces.length === 0) return

    workspaces.forEach((workspace) => {
      const condition = !workspace.startsWith('!') && !workspace.startsWith('*')
      if (condition) {
        const packageFormatted = workspace.replace(/\/\*+(\/\*+)*$/, '/')
        const exists = packages.find((pck) => packageFormatted.startsWith(pck))
        if (!exists) packages.push(packageFormatted)
      }
    })

    return packages
  } catch (error) {
    console.error(error)
  }
}
