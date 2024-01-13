'use client'
import { useCallback, useMemo, useRef } from 'react'
import { EditorState, Transaction } from '@tiptap/pm/state'
import { type Editor as CoreEditor, findChildren } from '@tiptap/core'
import { useEditor } from '@tiptap/react'
import { SectionKey } from '@/types'
import { getBadgeByName, getRepositoryTreeDirectory } from '@/utils/github'
import { RepositoryTemplate } from '@/utils/repository-template'
import { getContributors, getLicense, getRepositoryData } from '@/services/github'
import { useBuilder } from '@/store'
import { CustomEditor } from '@/components/editor/custom-editor'
import { ListSections } from '@/components/list-sections'
import { DEFAULT_EXTENSIONS } from '@/components/editor/extensions'
import Banner from '@/components/editor/custom-extensions/banner'
import Acknowledgments from '@/components/editor/custom-extensions/acknowledgments'
import Roadmap from '@/components/editor/custom-extensions/roadmap'
import RunLocally from '@/components/editor/custom-extensions/run-locally'
import License from '@/components/editor/custom-extensions/license'
import ProjectStructure from '@/components/editor/custom-extensions/project-structure'
import Badge from '@/components/editor/custom-extensions/badge'
import ContributorsNode from '@/components/editor/custom-extensions/contributors'
import Changelog from '@/components/editor/custom-extensions/changelog'
import Prerequisites from '@/components/editor/custom-extensions/prerequisites'
import Faq from '@/components/editor/custom-extensions/faq'
import Commands from '@/components/editor/custom-extensions/commands'
import Deploy from '@/components/editor/custom-extensions/deploy'
import Overview from '@/components/editor/custom-extensions/overview'
import TechStack from '@/components/editor/custom-extensions/tech-stack'
import ProjectSummary from '@/components/editor/custom-extensions/project-summary'
import EnvVariablesGuide from '@/components/editor/custom-extensions/env-variables-guide'
import TableContents from '@/components/editor/custom-extensions/table-contents'
import { BadgesOptions } from '@/components/editor/components/badges-options'
import { ContributorsOptions } from '@/components/editor/components/contributors-options'

export function BuilderSections() {
  const updateSection = useBuilder((store) => store.updateSection)
  const listSections = useBuilder((store) => store.listSections)
  const editor = useEditor({
    editable: true,
    injectCSS: false,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose-base prose-neutral dark:prose-invert max-w-none font-default focus:outline-none h-[calc(100vh-405px)] md:h-[calc(100vh-106px)] overflow-y-auto scrollbar-hide'
      }
    },
    //@ts-ignore
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
    ],
    onUpdate: ({ transaction }) => {
      checkForNodeDeletions({ transaction })
    }
  })

  const removeNodeFromEditor = useCallback(
    (section: SectionKey) => {
      const nodes = Object.values(editor?.schema.nodes ?? {}).filter((node) =>
        node.name.includes('custom-')
      )
      // console.log(nodes)
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

  const checkForNodeDeletions = useCallback(({ transaction }: { transaction: Transaction }) => {
    const nodeNames = new Set<string>()
    transaction.doc.forEach((node) => {
      if (node.type.name) {
        nodeNames.add(node.type.name)
      }
    })
    // Get previous nodes to detect deleted ones
    transaction.before.forEach((node) => {
      if (node.type.name && !nodeNames.has(node.type.name)) {
        updateSection(node.type.name as SectionKey)
      }
    })
  }, [])

  const addSection = async ({
    section,
    options
  }: {
    section: SectionKey
    options?: { data: any }
  }) => {
    const repository = await getRepositoryData({
      urlRepository: 'https://github.com/xavimondev/easyreadme'
    })
    if (!repository) return
    const repositoryTemplate = new RepositoryTemplate(repository!)
    const sectionItem = listSections.find((sec) => sec.id === section)
    // FIXME: removeNodeFromEditor does not update state because nodes have different ids/names
    removeNodeFromEditor(section)
    updateSection(section)

    if (sectionItem && sectionItem.added) {
      return
    }

    const owner = repositoryTemplate.getRepoOwner()
    const repositoryName = repositoryTemplate.getRepoName()

    const endPos = editor?.state.doc.resolve(editor.state.doc.childCount).end() ?? 0

    if (section === 'acknowledgements') {
      editor?.chain().insertContentAt(endPos, '<Acknowledgments />').focus('end').run()
    } else if (section === 'badges') {
      // TODO
      const { data } = options ?? {}
      const { id } = data
      const badge = getBadgeByName({
        owner,
        repoName: repositoryName,
        badge: id
      })
      editor
        ?.chain()
        // @ts-ignore
        .insertBadge({
          endPos,
          data: badge
        })
    } else if (section === 'banner') {
      editor?.chain().insertContentAt(endPos, '<Banner />').focus('end').run()
    } else if (section === 'changelog') {
      editor?.chain().insertContentAt(endPos, '<Changelog />').focus('end').run()
    } else if (section === 'ext-commands') {
      editor?.chain().insertContentAt(endPos, '<Commands />').focus('end').run()
    } else if (section === 'contributors') {
      const { data } = options ?? {}

      if (data === 'gallery') {
        // @ts-ignore
        editor?.chain().insertContributors({
          endPos,
          type: 'gallery',
          data: {
            owner,
            repository: repositoryName
          }
        })
      } else {
        const contributors = await getContributors({
          repoName: repositoryName,
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

        // @ts-ignore
        editor?.chain().insertContributors({
          endPos,
          type: 'table',
          data: {
            listContributors,
            repository: repositoryName
          }
        })
      }
    } else if (section === 'deploy') {
      editor?.chain().insertContentAt(endPos, '<Deploy />').focus('end').run()
    } else if (section === 'faq') {
      editor?.chain().insertContentAt(endPos, '<Faq />').focus('end').run()
    } else if (section === 'license') {
      const license = await getLicense({
        repoName: repositoryName,
        owner
      })
      // @ts-ignore
      editor?.chain().insertLicense({
        endPos,
        license
      })
    } else if (section === 'overview') {
      const prompt = await repositoryTemplate.getOverview()
      const request = await fetch('/api/ai', {
        method: 'POST',
        body: JSON.stringify({
          format: 'string',
          prompt
        }),
        headers: {
          'Content-type': 'application/json'
        }
      })
      const response = await request.json()
      const overview = response.data
      // @ts-ignore
      editor?.chain().insertOverview({ endPos, content: overview })
    } else if (section === 'prerequisites') {
      editor?.chain().insertContentAt(endPos, '<Prerequisites />').focus('end').run()
    } else if (section === 'project-structure') {
      const tree = await getRepositoryTreeDirectory({
        repoName: repositoryName,
        owner: owner,
        branch: repository?.branch
      })

      // @ts-ignore
      editor?.chain().insertProjectStructure({ endPos, tree })
    } else if (section === 'project-summary') {
      let projectSummary = ''
      const prompt = await repositoryTemplate.getProjectSummaryJson()
      if (prompt === '') {
        projectSummary = `Insert your project's summary.`
        // @ts-ignore
        editor?.chain().insertProjectSummary({ content: projectSummary })
        return
      }
      const request = await fetch('/api/ai', {
        method: 'POST',
        body: JSON.stringify({
          format: 'json',
          prompt
        }),
        headers: {
          'Content-type': 'application/json'
        }
      })
      const response = await request.json()
      projectSummary = response.data.data
      // @ts-ignore
      editor?.chain().insertProjectSummary({ endPos, content: projectSummary })
    } else if (section === 'roadmap') {
      // @ts-ignore
      editor?.chain().insertContentAt(endPos, '<Roadmap />').focus('end').run()
    } else if (section === 'run-locally') {
      // @ts-ignore
      editor?.chain().insertRunLocally({ endPos, mainLanguage: repository.language })
    } else if (section === 'setting-up') {
      let environmentVariables = ''
      const prompt = await repositoryTemplate.getEnvironmentVariablesGuideJson()
      if (prompt === '') {
        environmentVariables = `Insert your environment variables.`
        console.log(environmentVariables)
        // @ts-ignore
        editor?.chain().insertEnvVariablesGuide({ content: environmentVariables })
        return
      }
      const request = await fetch('/api/ai', {
        method: 'POST',
        body: JSON.stringify({
          format: 'json',
          prompt
        }),
        headers: {
          'Content-type': 'application/json'
        }
      })
      const response = await request.json()
      environmentVariables = response.data.data
      // @ts-ignore
      editor?.chain().insertEnvVariablesGuide({ endPos, content: environmentVariables })
    } else if (section === 'stack') {
      let stack = ''
      const prompt = await repositoryTemplate.getTechStackJson()
      if (prompt === '') {
        stack = `Include a concise explanation about the Tech Stack employed.`
        // @ts-ignore
        editor?.chain().insertTechStack({ endPos, content: stack.dependencies })
        return
      }
      const request = await fetch('/api/ai', {
        method: 'POST',
        body: JSON.stringify({
          format: 'json',
          prompt
        }),
        headers: {
          'Content-type': 'application/json'
        }
      })
      const response = await request.json()
      stack = response.data
      // @ts-ignore
      editor?.chain().insertTechStack({ endPos, content: stack.dependencies })
    } else if (section === 'table-contents') {
      // TODO: List by order in what items were added
      const sectionList = listSections.filter((sec) => sec.id !== section && sec.added)
      // @ts-ignore
      editor?.chain().insertTableContents({ endPos, content: sectionList })
    }
  }

  const customSections: Partial<Record<SectionKey, JSX.Element>> = useMemo(() => {
    return {
      badges: <BadgesOptions addSection={addSection} />,
      contributors: <ContributorsOptions addSection={addSection} />
    }
  }, [editor])

  return (
    <div className='h-full w-full grid grid-cols-1 md:grid-cols-[500px,_1fr] gap-3 mt-4 mx-2'>
      <ListSections customSections={customSections} addSection={addSection} />
      <CustomEditor editor={editor} />
    </div>
  )
}
