import { useCallback } from 'react'
import { findChildren, useEditor } from '@tiptap/react'

import { BadgeName, ContributorOption, NodeName } from '@/types/builder'
import { GitRepository } from '@/types/git'

import { SECTIONS_EXCLUDED_FROM_TABLE_CONTENTS, SECTIONS_EXCLUDED_FROM_UPDATES } from '@/constants'
import { getBadgeByName, getRepositoryTreeDirectory } from '@/utils/github'
import {
  getEnvironmentVariablesGuideData,
  getOverviewData,
  getProjectSummaryData,
  getTechStackData
} from '@/utils/readme'
import { getContributors, getGenerationAI, getLicense } from '@/services/github'
import { useBuilder } from '@/store'
import { DEFAULT_EXTENSIONS } from '@/components/editor/extensions'
import Acknowledgments from '@/components/editor/nodes/acknowledgments'
import Badge from '@/components/editor/nodes/badge'
import Banner from '@/components/editor/nodes/banner'
import Changelog from '@/components/editor/nodes/changelog'
import Commands from '@/components/editor/nodes/commands'
import ContributorsNode from '@/components/editor/nodes/contributors'
import Deploy from '@/components/editor/nodes/deploy'
import EnvVariablesGuide from '@/components/editor/nodes/env-variables-guide'
import Faq from '@/components/editor/nodes/faq'
import License from '@/components/editor/nodes/license'
import Overview from '@/components/editor/nodes/overview'
import Prerequisites from '@/components/editor/nodes/prerequisites'
import ProjectStructure from '@/components/editor/nodes/project-structure'
import ProjectSummary from '@/components/editor/nodes/project-summary'
import Roadmap from '@/components/editor/nodes/roadmap'
import RunLocally from '@/components/editor/nodes/run-locally'
import TableContents from '@/components/editor/nodes/table-contents'
import TechStack from '@/components/editor/nodes/tech-stack'

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
const dataRepository = undefined

export function useReadme() {
  // const tableOfContents = useRef<{ id: NodeName; name: string }[]>()
  const {
    updateSection,
    listSections,
    addSectionToTableOfContents,
    removeSectionFromTableOfContents
  } = useBuilder((store) => store)
  const editor = useEditor({
    editable: true,
    injectCSS: false,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose-base prose-neutral dark:prose-invert max-w-none font-default focus:outline-none h-[calc(100vh-405px)] md:h-[calc(100vh-106px)] overflow-y-auto scrollbar-hide'
      }
    },
    extensions: [
      ...DEFAULT_EXTENSIONS,
      Roadmap,
      Banner,
      Acknowledgments,
      RunLocally,
      License,
      ProjectStructure,
      Badge,
      Changelog,
      Prerequisites,
      Faq,
      Commands,
      Deploy,
      Overview,
      TechStack,
      ProjectSummary,
      EnvVariablesGuide,
      TableContents,
      ContributorsNode
    ]
  })

  const addAcknowledgment = useCallback(
    ({ endPos }: { endPos: number }) => {
      editor?.chain().insertContentAt(endPos, '<Acknowledgments />').focus('end').run()
    },
    [editor]
  )

  const addBanner = useCallback(
    ({ endPos }: { endPos: number }) => {
      editor?.chain().insertContentAt(endPos, '<Banner />').focus('end').run()
    },
    [editor]
  )

  const addChangelog = useCallback(
    ({ endPos }: { endPos: number }) => {
      editor?.chain().insertContentAt(endPos, '<Changelog />').focus('end').run()
    },
    [editor]
  )

  const addCommands = useCallback(
    ({ endPos }: { endPos: number }) => {
      editor?.chain().insertContentAt(endPos, '<Commands />').focus('end').run()
    },
    [editor]
  )

  const addDeploy = useCallback(
    ({ endPos }: { endPos: number }) => {
      editor?.chain().insertContentAt(endPos, '<Deploy />').focus('end').run()
    },
    [editor]
  )

  const addFaq = useCallback(
    ({ endPos }: { endPos: number }) => {
      editor?.chain().insertContentAt(endPos, '<Faq />').focus('end').run()
    },
    [editor]
  )

  const addLicense = useCallback(
    ({ endPos, license }: { endPos: number; license: any }) => {
      editor?.chain().insertLicense({
        endPos,
        license
      })
    },
    [editor]
  )

  const addPrerequisites = useCallback(
    ({ endPos }: { endPos: number }) => {
      editor?.chain().insertContentAt(endPos, '<Prerequisites />').focus('end').run()
    },
    [editor]
  )

  const addProjectStructure = useCallback(
    ({ endPos, tree }: { endPos: number; tree: string }) => {
      editor?.chain().insertProjectStructure({ endPos, tree })
    },
    [editor]
  )

  const addRoadmap = useCallback(
    ({ endPos }: { endPos: number }) => {
      editor?.chain().insertContentAt(endPos, '<Roadmap />').focus('end').run()
    },
    [editor]
  )

  const addRunLocally = useCallback(
    ({ endPos, data }: { endPos: number; data: any }) => {
      editor?.chain().insertRunLocally({ endPos, data })
    },
    [editor]
  )

  const addTableOfContent = useCallback(
    ({ endPos, content }: { endPos: number; content: any }) => {
      editor?.chain().insertTableContents({ endPos, content })
    },
    [editor]
  )

  const addBadge = useCallback(
    ({ endPos, data }: { endPos: number; data: any }) => {
      editor?.chain().insertBadge({
        endPos,
        data
      })
    },
    [editor]
  )

  const addContributor = useCallback(
    ({ endPos, type, data }: { endPos: number; type?: ContributorOption; data?: any }) => {
      editor?.chain().insertContributors({
        endPos,
        data,
        type
      })
    },
    [editor]
  )

  const addOverview = useCallback(
    ({ endPos, data }: { endPos: number; data: any }) => {
      editor?.chain().insertOverview({ endPos, ...data })
    },
    [editor]
  )

  const addProjectSummary = useCallback(
    ({ endPos, data }: { endPos: number; data: any }) => {
      editor?.chain().insertProjectSummary({ endPos, ...data })
    },
    [editor]
  )

  const addSettingUpGuide = useCallback(
    ({ endPos, data }: { endPos: number; data: any }) => {
      editor?.chain().insertEnvVariablesGuide({ endPos, ...data })
    },
    [editor]
  )

  const addTechStack = useCallback(
    ({ endPos, data }: { endPos: number; data: any }) => {
      editor?.chain().insertTechStack({ endPos, ...data })
    },
    [editor]
  )

  const updateNode = useCallback(
    ({ node, data }: { node: NodeName; data?: any }) => {
      editor?.chain().updateAttributes(node, data).run()
    },
    [editor]
  )

  const removeNode = useCallback(
    (section: NodeName) => {
      const nodes = Object.values(editor?.schema.nodes ?? {}).filter((node) =>
        node.name.includes('custom-')
      )

      editor?.commands.forEach(nodes, (_, { tr, commands }) => {
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
    [editor]
  )

  const clearEditorContent = useCallback(() => {
    editor?.commands.clearContent()
  }, [editor])

  const findNodeByName = (nodeName: NodeName) => {
    let foundNode = null

    editor?.state.doc.descendants((node) => {
      if (node.type.name === nodeName) {
        foundNode = node
      }
    })

    return foundNode
  }

  // FIXME: sections are not generating in specified order
  // FIXME: Make badges draggable
  const buildReadme = async ({
    data,
    options
  }: {
    data: NodeName | NodeName[]
    options?: { data: any }
  }) => {
    if (Array.isArray(data)) {
      const hasTableOfContentsSection = data.find((sec) => sec === NodeName.TABLE_CONTENTS)
      if (hasTableOfContentsSection) {
        // Updating table of contents with new sections
        const newTableOfContents = data
          .filter((section) => !SECTIONS_EXCLUDED_FROM_TABLE_CONTENTS.includes(section))
          .map((sectionId) => {
            const sectionName = listSections.find((sec) => sec.id === sectionId)!
            return {
              id: sectionName.id,
              name: sectionName.name
            }
          })
        addSectionToTableOfContents(newTableOfContents)
      }

      let sectionsToUpdate = data
      const addedSections = listSections
        .filter((section) => section.added)
        .map((section) => section.id)

      if (addedSections.length > 0) {
        const deletedSections = addedSections.filter((section) => !data.includes(section))
        const newAddedSections = data.filter((section) => !addedSections.includes(section))
        sectionsToUpdate = deletedSections.concat(newAddedSections)
      }

      clearEditorContent()
      updateSection(sectionsToUpdate)
      for (let i = 0; i < data.length; i++) {
        const sectionId = data.at(i)
        await addSection({
          section: sectionId!,
          options
        })
      }

      return
    }

    const sectionItem = listSections.find((sec) => sec.id === data)!

    if (!SECTIONS_EXCLUDED_FROM_UPDATES.includes(data)) {
      updateSection(data)
    }

    if (!sectionItem.added && !SECTIONS_EXCLUDED_FROM_TABLE_CONTENTS.includes(data)) {
      // adding new section to table of contents
      addSectionToTableOfContents({
        id: sectionItem.id,
        name: sectionItem.name
      })
    }

    if (sectionItem.added && !SECTIONS_EXCLUDED_FROM_UPDATES.includes(data)) {
      removeNode(data) // removing node from editor
      removeSectionFromTableOfContents(data) // removing section from table of contents
      return
    }

    await addSection({
      section: data,
      options
    })
  }

  const addSection = async ({
    section,
    options
  }: {
    section: NodeName
    options?: { data: any }
  }) => {
    const { repoName, owner, branch, description, language, urlRepository } =
      DEFAULT_REPOSITORY_DATA

    const endPos = editor?.state.doc.resolve(editor.state.doc.childCount).end() ?? 0

    if (section === NodeName.ACKNOWLEDGEMENTS) {
      addAcknowledgment({ endPos })
    } else if (section === NodeName.BADGE) {
      let badgesData = DEFAULT_BADGES
      if (options) {
        const { data } = options
        badgesData = data
      }
      if (Array.isArray(badgesData)) {
        console.log(badgesData)
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
      const { id } = badgesData
      const badge = getBadgeByName({
        owner,
        repoName,
        badge: id
      })
      addBadge({
        endPos,
        data: badge
      })
    } else if (section === NodeName.BANNER) {
      addBanner({ endPos })
    } else if (section === NodeName.CHANGELOG) {
      addChangelog({ endPos })
    } else if (section === NodeName.COMMANDS) {
      addCommands({ endPos })
    } else if (section === NodeName.CONTRIBUTORS) {
      // TODO: make sure to skip when user selects table from customize tab
      if (!options) {
        console.log('no contributors')
        addContributor({
          endPos,
          data: {
            repository: repoName,
            owner
          },
          type: ContributorOption.GALLERY
        })
        return
      }

      const { data } = options
      let nodeFound = null
      const node = findNodeByName(section)

      if (!node) {
        addContributor({
          endPos
        })
      } else {
        nodeFound = node
      }

      let attrsData: any = {
        owner
      }

      if (data === ContributorOption.TABLE) {
        const contributors = await getContributors({
          repoName,
          owner
        })

        const listContributors = contributors
          .map(({ login, avatar_url, html_url, contributions }: any) => ({
            username: login,
            avatar: avatar_url,
            profileUrl: html_url,
            contributions: contributions
          }))
          .filter(
            (contributor: any) =>
              contributor.username !== 'dependabot[bot]' && contributor.username !== owner
          )

        attrsData = {
          listContributors
        }
      }

      if (!node) {
        const endPosFinal = editor?.state.doc.resolve(editor?.state.doc.childCount).end() ?? -1 ?? 0
        nodeFound = editor?.state.tr.doc.nodeAt(endPosFinal)
      }

      const newContent = {
        ...nodeFound?.attrs,
        type: data,
        data: {
          ...attrsData,
          repository: repoName
        }
      }

      updateNode({
        node: section,
        data: newContent
      })
    } else if (section === NodeName.DEPLOY) {
      addDeploy({ endPos })
    } else if (section === NodeName.FAQ) {
      addFaq({ endPos })
    } else if (section === NodeName.LICENSE) {
      let license = DEFAULT_DATA_CACHED[section]
      if (dataRepository) {
        license = await getLicense({
          repoName,
          owner
        })
      }
      addLicense({ endPos, license })
    } else if (section === NodeName.OVERVIEW) {
      if (!dataRepository) {
        const data = DEFAULT_DATA_CACHED[section]
        addOverview({
          endPos,
          data
        })
        return
      }

      addOverview({
        endPos,
        data: {
          showPlaceholder: true
        }
      })

      const endPosFinal = editor?.state.doc.resolve(editor?.state.doc.childCount).end() ?? -1 ?? 0
      const nodoActual = editor?.state.tr.doc.nodeAt(endPosFinal)

      const prompt = await getOverviewData({
        branch,
        description,
        language,
        owner,
        repoName
      })
      const response = await getGenerationAI({
        format: 'string',
        prompt
      })
      const overview = response.data
      const newContent = {
        ...nodoActual?.attrs,
        content: overview,
        showPlaceholder: false
      }

      updateNode({
        node: section,
        data: newContent
      })
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
      if (!dataRepository) {
        const data = DEFAULT_DATA_CACHED[section]
        addProjectSummary({
          endPos,
          data
        })
        return
      }
      addProjectSummary({
        endPos,
        data: {
          showPlaceholder: true
        }
      })
      const endPosFinal = editor?.state.doc.resolve(editor?.state.doc.childCount).end() ?? -1 ?? 0
      const nodoActual = editor?.state.tr.doc.nodeAt(endPosFinal)

      const prompt = await getProjectSummaryData({
        owner,
        repoName,
        branch,
        language
      })
      if (prompt === '') {
        const newContent = {
          ...nodoActual?.attrs,
          content: []
        }
        updateNode({
          node: section,
          data: newContent
        })
        return
      }

      const response = await getGenerationAI({
        format: 'json',
        prompt
      })
      const newContent = {
        ...nodoActual?.attrs,
        content: response.data.data,
        showPlaceholder: false
      }
      updateNode({
        node: section,
        data: newContent
      })
    } else if (section === NodeName.ROADMAP) {
      addRoadmap({
        endPos
      })
    } else if (section === NodeName.RUN_LOCALLY) {
      let mainLanguage = DEFAULT_DATA_CACHED[section].mainLanguage

      if (dataRepository) {
        mainLanguage = language
      }

      addRunLocally({
        endPos,
        data: {
          mainLanguage,
          repoName,
          urlRepository
        }
      })
    } else if (section === NodeName.SETTING_UP) {
      if (!dataRepository) {
        const data = DEFAULT_DATA_CACHED[section]
        addSettingUpGuide({
          endPos,
          data
        })
        return
      }

      addSettingUpGuide({
        endPos,
        data: {
          showPlaceholder: true
        }
      })
      const endPosFinal = editor?.state.doc.resolve(editor?.state.doc.childCount).end() ?? -1 ?? 0
      const nodoActual = editor?.state.tr.doc.nodeAt(endPosFinal)

      const prompt = await getEnvironmentVariablesGuideData({
        owner,
        repoName
      })
      if (prompt === '') {
        const newContent = {
          ...nodoActual?.attrs,
          content: [],
          showPlaceholder: false
        }
        updateNode({
          node: section,
          data: newContent
        })
        return
      }
      const response = await getGenerationAI({
        format: 'json',
        prompt
      })
      const newContent = {
        ...nodoActual?.attrs,
        content: response.data.data,
        showPlaceholder: false
      }
      updateNode({
        node: section,
        data: newContent
      })
    } else if (section === NodeName.TECH_STACK) {
      if (!dataRepository) {
        const data = DEFAULT_DATA_CACHED[section]
        addTechStack({
          endPos,
          data
        })
        return
      }
      addTechStack({
        endPos,
        data: {
          showPlaceholder: true
        }
      })

      const prompt = await getTechStackData({
        branch,
        language,
        owner,
        repoName
      })

      const endPosFinal = editor?.state.doc.resolve(editor?.state.doc.childCount).end() ?? -1 ?? 0
      const nodoActual = editor?.state.tr.doc.nodeAt(endPosFinal)

      if (prompt === '') {
        const newContent = {
          ...nodoActual?.attrs,
          content: [],
          showPlaceholder: false
        }
        updateNode({
          node: section,
          data: newContent
        })
        return
      }
      const response = await getGenerationAI({
        format: 'json',
        prompt
      })
      const newContent = {
        ...nodoActual?.attrs,
        content: response.data.dependencies,
        showPlaceholder: false
      }
      updateNode({
        node: section,
        data: newContent
      })
    } else if (section === NodeName.TABLE_CONTENTS) {
      addTableOfContent({
        endPos,
        content: []
      })
    }
  }

  return {
    editor,
    buildReadme
  }
}
