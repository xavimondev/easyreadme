import { z } from 'zod'

/*
Follow this format:
{
  name: NAME_DEPENDENCY, 
  link: LINK_RESOURCE, 
  description: Brief explanation (up to 100 characters) about the dependency's role.
}
*/

export const TECH_STACK_SCHEMA = z.object({
  data: z.array(
    z.object({
      name: z.string().describe('Name of the dependency'),
      link: z.string().describe('Link to the resource'),
      description: z
        .string()
        .describe("Brief explanation (up to 100 characters) about the dependency's purpose.")
    })
  )
})

/*

Follow this format:
{
  name: ENVIRONMENT VARIABLE NAME,
  steps: [Up to 5 bullet point instructions, each not exceeding 100 characters]
}

*/
export const SETTING_UP_ENV_VARS_SCHEMA = z.object({
  data: z.array(
    z.object({
      name: z.string(),
      steps: z.array(z.string())
    })
  )
})

/*
Follow this format:
{
  name: PATH,
  link: PATH,
  description: Brief summary of primary functionalities/components (up to 80 characters).
}

*/

export const PROJECT_SUMMARY_SCHEMA = z.object({
  data: z.array(
    z.object({
      name: z.string().describe('Path'),
      link: z.string().describe('Path'),
      description: z
        .string()
        // .max(80)
        .describe('Brief summary of primary functionalities/components (up to 80 characters).')
    })
  )
})

/*
Your task is to craft a summary with the following format:
  {
    workspace: path's name. Don't add "/" at the end.
    description: create a concise overview that outlines the primary purpose of this workspace. Utilize the nested folders to provide insight into the nature of this path (up to 70 words).
    paths: [
      {
        name: nested folder,
        description: create a brief summary emphasizing the main purpose and essential features of the nested folder (up to 70 words).
      }
    ]
  }

*/

export const MONOREPO_SUMMARY_SCHEMA = z.object({
  data: z.array(
    z.object({
      workspace: z.string().describe(`Path's name. Don't add "/" at the end.`),
      description: z
        .string()
        // .max(70)
        .describe(
          'Create a concise overview that outlines the primary purpose of this workspace. Utilize the nested folders to provide insight into the nature of this path (up to 70 words).'
        ),
      paths: z.array(
        z.object({
          name: z.string().describe('Nested folder'),
          description: z
            .string()
            // .max(70)
            .describe(
              'Create a brief summary emphasizing the main purpose and essential features of the nested folder (up to 70 words).'
            )
        })
      )
    })
  )
})
