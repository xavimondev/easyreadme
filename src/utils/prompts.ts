// TODO: Ignore some files of the directory
export const getPromptOverview = ({
  repositoryName,
  directoryTree
}: {
  repositoryName: string
  directoryTree: string
}) => {
  return `Generate an overview of the given project using its name ${repositoryName} and its directory tree:

${directoryTree}
Provide a precise overview that captures the fundamental features and project's goal.
Keep your response under 200 characters (including spaces).
Only respond with a markdown.`
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

Pick the 10 most important dependencies that cover the following aspects: authentication, data fetching, state management, 
animations, styling, server-client communication, testing and deployment. 
Generate a summary like this:
- [name_dependency][link_resource]: Short explanation about the dependency.Limit your response to a maximum of 100 characters.
Where link_resource is dependency's url information.
Only respond with a markdown.`
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
Limit your response to a maximum of 500 characters.
Only responde with a markdown.
`
}
