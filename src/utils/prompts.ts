// TODO: Ignore some files of the directory
export const getPromptOverview = ({
  repositoryName,
  directoryTree
}: {
  repositoryName: string
  directoryTree: string
}) => {
  return `You are a Senior Software Engineer.
Your goal is to generate an overview of the given project using its name ${repositoryName} and its directory tree:

${directoryTree}
Provide a precise overview that captures the fundamental features and project's goal.
Keep your response under 300 characters (including spaces).
Return as a paragraph.`
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
- [name_dependency][link_resource]: Short explanation about the dependency.  Limit your response to a maximum of 100 characters.
Where link_resource is dependency's url information.
Return your response as a markdown using bullet points.`
}

export const generateGuideEnvironmentVariables = ({
  environmentVars
}: {
  environmentVars: string
}) => {
  return `Given the following environment variables:

${environmentVars}

Please provide a precise guide to generate their values.
Each guide has a header and a enumerated list. Example:
## Supabase
Generated list

Generate your response as a Markdown enumerated list.
Limit your response to a maximum of 1000 characters.`
}
