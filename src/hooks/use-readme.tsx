import { useCallback } from 'react'
import { findChildren } from '@tiptap/react'
import { toast } from 'sonner'

import { BadgeName, NodeName } from '@/types/builder'
import { GitRepository } from '@/types/git'

import {
  LIST_TEMPLATES,
  SECTIONS_EXCLUDED_FROM_TABLE_CONTENTS,
  SECTIONS_EXCLUDED_FROM_UPDATES
} from '@/constants'
import { getBadgeByName, getRepositoryTreeDirectory } from '@/utils/github'
import {
  getEnvironmentVariablesGuideData,
  getProjectSummaryData,
  getTechStackData
} from '@/utils/readme'
import { getGenerationAI, getLicense, getRepositoryData } from '@/services/github'
import { useBuilder } from '@/store'
import { useSections } from '@/hooks/use-sections'

const DEFAULT_REPOSITORY_DATA: GitRepository = {
  urlRepository: 'https://github.com/xavimondev/easyreadme',
  repoName: 'easyreadme',
  owner: 'xavimondev',
  description:
    'Easyreadme helps you simplify README creation and generate visually stunning ones with the help of AI and elegant pre-designed templates.',
  language: 'TypeScript',
  branch: 'main'
}

const DEFAULT_DATA_CACHED = {
  [NodeName.OVERVIEW]: {
    content:
      'Easyreadme streamlines README creation, leveraging AI to craft visually appealing documentation with elegant templates. Simplify your project communication effortlessly.'
  },
  [NodeName.LICENSE]: {
    name: 'MIT',
    url: 'https://github.com/xavimondev/easyreadme/blob/main/LICENSE'
  },
  [NodeName.PROJECT_SUMMARY]: {
    content: [
      {
        name: 'src',
        link: 'src',
        description: 'Main source code directory for the TypeScript project.'
      },
      {
        name: 'src/app',
        link: 'src/app',
        description: 'Application-specific code and functionalities.'
      },
      {
        name: 'src/components',
        link: 'src/components',
        description: 'Reusable UI components for the application.'
      },
      {
        name: 'src/services',
        link: 'src/services',
        description: 'Services providing specific functionalities to the application.'
      },
      {
        name: 'src/styles',
        link: 'src/styles',
        description: 'Styling configurations and global styles for the project.'
      },
      {
        name: 'public',
        link: 'public',
        description: 'Public assets and resources accessible from the application.'
      },
      {
        name: 'public/hero',
        link: 'public/hero',
        description: "Hero images or visuals for the project's landing or main page."
      },
      {
        name: 'src/utils',
        link: 'src/utils',
        description: 'Utility functions and helper modules for various tasks.'
      }
    ]
  },
  [NodeName.SETTING_UP]: {
    content: [
      {
        name: 'OPENAI_API_KEY',
        steps: [
          'Visit the OpenAI website and sign in to your account.',
          'Navigate to the API section in your account settings.',
          'Generate a new API key for access to the GPT models.',
          'Copy the generated API key and securely store it.'
        ]
      },
      {
        name: 'GITHUB_ACCESS_TOKEN',
        steps: [
          'Log in to your GitHub account.',
          "Go to 'Settings' and navigate to 'Developer settings'.",
          "Select 'Personal access tokens' and generate a new token.",
          "Choose the required scopes for the token, e.g., 'repo' for repository access.",
          'Copy the generated token and store it securely.'
        ]
      },
      {
        name: 'KV_REST_API_URL',
        steps: ['Insert a guide']
      },
      {
        name: 'KV_REST_API_TOKEN',
        steps: ['Insert a guide']
      }
    ]
  },
  [NodeName.TECH_STACK]: {
    content: [
      {
        name: '@tiptap/core',
        link: 'https://www.tiptap.dev/',
        description: 'WYSIWYG editor framework for Vue.js and React.'
      },
      {
        name: 'swr',
        link: 'https://swr.vercel.app/',
        description: 'React Hooks library for data fetching.'
      },
      {
        name: 'zustand',
        link: 'https://zustand.surge.sh/',
        description: 'State management for React using Zustand.'
      },
      {
        name: 'tailwindcss',
        link: 'https://tailwindcss.com/',
        description: 'A utility-first CSS framework for rapid UI development.'
      },
      {
        name: 'next',
        link: 'https://nextjs.org/',
        description: 'React framework for building web applications with server-side rendering.'
      }
    ]
  },
  [NodeName.RUN_LOCALLY]: {
    mainLanguage: DEFAULT_REPOSITORY_DATA.language
  }
}

const DEFAULT_BADGES: BadgeName[] = [
  'stars',
  'contributors',
  'top_language',
  'issues',
  'deployment',
  'license'
]

export function useReadme() {
  const {
    updateSection,
    listSections,
    addSectionToTableOfContents,
    removeSectionFromTableOfContents,
    gitRepositoryData,
    readmeEditor,
    gitUrlRepository,
    setGitRepositoryData,
    templateSelected,
    setTableOfContents
  } = useBuilder((store) => store)
  const {
    addAcknowledgment,
    addBanner,
    addChangelog,
    addCommands,
    addContributor,
    addBadge,
    addDeploy,
    addFaq,
    addLicense,
    addOverview,
    addPrerequisites,
    addProjectStructure,
    addProjectSummary,
    addRoadmap,
    addRunLocally,
    addSettingUpGuide,
    addTableOfContent,
    addTechStack,
    addAlert,
    addApiReference,
    addFeedback,
    addCodeSample
  } = useSections()

  const updateNode = useCallback(
    ({ node, data }: { node: NodeName; data?: any }) => {
      readmeEditor?.chain().updateAttributes(node, data).run()
    },
    [readmeEditor]
  )

  const removeNode = useCallback(
    (section: NodeName) => {
      const nodes = Object.values(readmeEditor?.schema.nodes ?? {}).filter((node) =>
        node.name.includes('custom-')
      )

      readmeEditor?.commands.forEach(nodes, (_, { tr, commands }) => {
        const item = findChildren(tr.doc, (node) => {
          return node.type.name === section
        })?.[0]
        if (!item) {
          return true
        }
        return commands.deleteRange({
          from: item.pos,
          to: item.pos + item.node.nodeSize
        })
      })
    },
    [readmeEditor]
  )

  const clearEditorContent = useCallback(() => {
    readmeEditor?.commands.clearContent()
  }, [readmeEditor])

  const findNodeByName = (nodeName: NodeName) => {
    let foundNode = null

    readmeEditor?.state.doc.descendants((node) => {
      if (node.type.name === nodeName) {
        foundNode = node
      }
    })

    return foundNode
  }

  const checkGitRepositoryData = async () => {
    if (!gitUrlRepository) return

    const data = await getRepositoryData({ urlRepository: gitUrlRepository })
    if (data) {
      setGitRepositoryData(data)
    }
    return data
  }

  const getTemplateSections = ({ template }: { template?: string }) => {
    const query = template ?? (templateSelected as string)
    if (!query) {
      toast.info(`You haven't selected a template.`)
      return
    }

    return LIST_TEMPLATES.find(({ nameTemplate }) => nameTemplate === query)!.sections
  }

  const buildTemplate = async ({ template }: { template?: string }) => {
    const gitData = await checkGitRepositoryData()

    const sections = getTemplateSections({ template })
    if (!sections) return

    const filteredSections = sections.filter(
      (section) => !SECTIONS_EXCLUDED_FROM_TABLE_CONTENTS.includes(section)
    )

    // Updating table of contents
    const mappedSections = filteredSections.map((section) => {
      const sectionData = listSections.find(({ id }) => id === section)!
      return {
        id: sectionData.id,
        name: sectionData.name
      }
    })
    setTableOfContents(mappedSections)

    let sectionsToUpdate = sections
    const addedSections = listSections
      .filter((section) => section.added)
      .map((section) => section.id)

    if (addedSections.length > 0) {
      const deletedSections = addedSections.filter((section) => !sections.includes(section))
      const newAddedSections = sections.filter((section) => !addedSections.includes(section))
      sectionsToUpdate = deletedSections.concat(newAddedSections)
    }

    clearEditorContent()
    updateSection(sectionsToUpdate)
    for (let i = 0; i < sections.length; i++) {
      const sectionId = sections.at(i)
      await addSection({
        section: sectionId!,
        gitData
      })
    }
  }

  const buildCustomReadme = async ({
    section,
    options
  }: {
    section: NodeName
    options?: { data: any }
  }) => {
    const gitData = await checkGitRepositoryData()

    const sectionItem = listSections.find((sec) => sec.id === section)

    if (!sectionItem) return

    if (!SECTIONS_EXCLUDED_FROM_UPDATES.includes(section)) {
      updateSection(section)
    }

    // adding new section to table of contents as long as it's not added already and not included in sections_excluded
    if (!sectionItem.added && !SECTIONS_EXCLUDED_FROM_TABLE_CONTENTS.includes(section)) {
      addSectionToTableOfContents({
        id: sectionItem.id,
        name: sectionItem.name
      })
    }

    if (sectionItem.added && !SECTIONS_EXCLUDED_FROM_UPDATES.includes(section)) {
      removeNode(section) // removing node from editor
      removeSectionFromTableOfContents(section) // removing section from table of contents
      return
    }

    await addSection({
      section: section,
      options,
      gitData
    })
  }

  const addSection = async ({
    section,
    gitData,
    options
  }: {
    section: NodeName
    gitData?: GitRepository
    options?: { data: any }
  }) => {
    const repositoryData = gitData ?? gitRepositoryData
    const { repoName, owner, branch, description, language, urlRepository } =
      repositoryData ?? DEFAULT_REPOSITORY_DATA
    let endPos = 0
    const lastNode = readmeEditor?.state.doc.lastChild
    if (lastNode) {
      const lastNodePos = readmeEditor?.state.doc.resolve(
        readmeEditor?.state.doc.content.size - lastNode.nodeSize
      )
      const { pos } = lastNodePos
      endPos = pos
    }

    if (section === NodeName.ACKNOWLEDGEMENTS) {
      addAcknowledgment({ endPos })
    } else if (section === NodeName.BADGE) {
      let badgesData = DEFAULT_BADGES

      if (options) {
        const { data } = options
        badgesData = data
      }

      if (Array.isArray(badgesData)) {
        for (let i = 0; i < badgesData.length; i++) {
          const id = badgesData.at(i)
          const badge = getBadgeByName({
            owner,
            repoName,
            badge: id!
          })
          addBadge({
            endPos: endPos + i,
            data: badge
          })
        }
        return
      }

      if (!gitRepositoryData) return

      const { id } = options?.data
      const badge = getBadgeByName({
        owner,
        repoName,
        badge: id
      })

      addBadge({
        endPos: -1,
        data: badge
      })
    } else if (section === NodeName.BANNER) {
      addBanner({ endPos: endPos })
    } else if (section === NodeName.CHANGELOG) {
      addChangelog({ endPos })
    } else if (section === NodeName.COMMANDS) {
      addCommands({ endPos })
    } else if (section === NodeName.CONTRIBUTORS) {
      addContributor({
        endPos: endPos,
        data: {
          repository: repoName,
          owner
        }
      })
    } else if (section === NodeName.DEPLOY) {
      addDeploy({ endPos })
    } else if (section === NodeName.FAQ) {
      addFaq({ endPos })
    } else if (section === NodeName.LICENSE) {
      let license = DEFAULT_DATA_CACHED[section]
      if (repositoryData) {
        license = await getLicense({
          repoName,
          owner
        })
      }
      addLicense({ endPos: endPos, license })
    } else if (section === NodeName.OVERVIEW) {
      let content = ''

      if (!repositoryData) {
        content = DEFAULT_DATA_CACHED[section].content
      }

      addOverview({
        endPos,
        data: {
          content
        }
      })
      // const prompt = await getOverviewData({
      //   branch,
      //   description,
      //   language,
      //   owner,
      //   repoName
      // })
      // const response = await getGenerationAI({
      //   format: 'string',
      //   prompt
      // })

      // if (response.name === 'Error') {
      //   toast.error(response.message)
      //   return
      // }
    } else if (section === NodeName.PREREQUISITES) {
      addPrerequisites({ endPos })
    } else if (section === NodeName.PROJECT_STRUCTURE) {
      const tree = await getRepositoryTreeDirectory({
        repoName,
        owner: owner,
        branch
      })
      addProjectStructure({ endPos, tree })
    } else if (section === NodeName.PROJECT_SUMMARY) {
      if (!repositoryData) {
        const data = DEFAULT_DATA_CACHED[section]
        addProjectSummary({
          endPos,
          data
        })
        return
      }

      const prompt = await getProjectSummaryData({
        owner,
        repoName,
        branch,
        language
      })
      if (prompt === '') {
        addProjectSummary({
          endPos,
          data: {
            content: []
          }
        })
        return
      }

      const response = await getGenerationAI({
        format: 'json',
        prompt
      })

      if (response.name === 'Error') {
        toast.error(response.message)
        return
      }

      addProjectSummary({
        endPos,
        data: {
          content: response.data.data
        }
      })
    } else if (section === NodeName.ROADMAP) {
      addRoadmap({
        endPos
      })
    } else if (section === NodeName.RUN_LOCALLY) {
      let mainLanguage = DEFAULT_DATA_CACHED[section].mainLanguage

      if (repositoryData) {
        mainLanguage = language
      }

      addRunLocally({
        endPos: endPos,
        data: {
          mainLanguage,
          repoName,
          urlRepository
        }
      })
    } else if (section === NodeName.SETTING_UP) {
      if (!repositoryData) {
        const data = DEFAULT_DATA_CACHED[section]
        addSettingUpGuide({
          endPos: endPos,
          data
        })
        return
      }

      const prompt = await getEnvironmentVariablesGuideData({
        owner,
        repoName
      })
      if (prompt === '') {
        addSettingUpGuide({
          endPos: endPos,
          data: {
            content: []
          }
        })
        return
      }

      const response = await getGenerationAI({
        format: 'json',
        prompt
      })

      if (response.name === 'Error') {
        toast.error(response.message)
        return
      }

      addSettingUpGuide({
        endPos: endPos,
        data: {
          content: response.data.data
        }
      })
    } else if (section === NodeName.TECH_STACK) {
      if (!repositoryData) {
        const data = DEFAULT_DATA_CACHED[section]
        addTechStack({
          endPos: endPos,
          data
        })
        return
      }

      const prompt = await getTechStackData({
        branch,
        language,
        owner,
        repoName
      })

      if (prompt === '') {
        addTechStack({
          endPos: endPos,
          data: {
            content: []
          }
        })
        return
      }

      const response = await getGenerationAI({
        format: 'json',
        prompt
      })

      if (response.name === 'Error') {
        toast.error(response.message)
        return
      }

      addTechStack({
        endPos: endPos,
        data: {
          content: response.data.dependencies
        }
      })
    } else if (section === NodeName.TABLE_CONTENTS) {
      addTableOfContent({
        endPos
      })
    } else if (section === NodeName.ALERT) {
      addAlert({ endPos, id: 'info' })
    } else if (section === NodeName.API_REFERENCE) {
      addApiReference({ endPos })
    } else if (section === NodeName.FEEDBACK) {
      addFeedback({ endPos })
    } else if (section === NodeName.CODE_SAMPLE) {
      addCodeSample({ endPos })
    }
  }

  return {
    buildCustomReadme,
    buildTemplate
  }
}
