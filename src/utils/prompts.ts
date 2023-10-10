export const getPromptRandomOverview = ({
  repositoryName,
  projectDescription
}: {
  repositoryName: string
  projectDescription: string
}) => {
  return `Generate a detailed project overview for ${repositoryName}.
${projectDescription !== '' ? `This project is described as ${projectDescription}.` : ''}
Keep your response under 200 characters.`
}

export const getPromptOverviewWithDependencies = ({
  repositoryName,
  dependencies,
  projectDescription
}: {
  repositoryName: string
  dependencies: string[]
  projectDescription: string
}) => {
  return `Generate a detailed project overview for ${repositoryName}.
${projectDescription !== '' ? `This project is described as ${projectDescription}.` : ''} 
It relies on:
${dependencies} 
to function efficiently and effectively.
Keep your response under 250 characters.`
}

export const generateTechStack = ({
  dependencies,
  language
}: {
  dependencies: string
  language: string
}) => {
  return `Given the following ${language} project dependencies:
${dependencies}

Pick the 8 most important dependencies that cover the following aspects: authentication, data fetching, state management, 
animations, styling, server-client communication, testing and deployment. 
Generate a summary like this:
- [name_dependency](link_resource): Short explanation about the dependency.Limit your response to a maximum of 100 characters.
Where link_resource is dependency's url information.
Only respond with a bullet list.`
}

export const generateGuideEnvironmentVariables = ({
  environmentVars
}: {
  environmentVars: string
}) => {
  return `Given the following environment variables:
${environmentVars}

Please provide a brief and precise guide to generate their values.
Each guide should have a header and a enumerated list.
Only responde with this format:
#### [Environment Variable]
[Bullet points to a maximun of 5]
`
}

export const generateProjectSummary = ({
  directories,
  mainLanguage
}: {
  directories: string[]
  mainLanguage: string
}) => {
  return `Given the following directories from a ${mainLanguage} project:
${directories}

Provide a comprehensive summary per each path. Only responde with this format:
- [**path**](path): Summary up to 100 characters.`
}
