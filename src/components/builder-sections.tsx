'use client'

import { useCallback, useMemo, useState } from 'react'
import { findChildren } from '@tiptap/core'
import { useEditor } from '@tiptap/react'

import { ContributorOption, NodeName } from '@/types/builder'

import { SECTIONS_EXCLUDED_FROM_UPDATES } from '@/constants'
import { getBadgeByName, getRepositoryTreeDirectory } from '@/utils/github'
import { RepositoryTemplate } from '@/utils/repository-template'
import { getContributors, getLicense, getRepositoryData } from '@/services/github'
import { useBuilder } from '@/store'
import { CustomEditor } from '@/components/editor/custom-editor'
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
import { BadgesOptions } from '@/components/editor/views/badges-options'
import { ContributorsOptions } from '@/components/editor/views/contributors-options'
import { ListSections } from '@/components/list-sections'
import { Searcher } from '@/components/searcher'

export function BuilderSections() {
  const [filterSection, setFilterSection] = useState('')
  const { updateSection, listSections } = useBuilder((store) => store)
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
    ]
  })

  const removeNodeFromEditor = useCallback(
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

  const findNodeByName = (nodeName: NodeName) => {
    let foundNode = null

    editor?.state.doc.descendants((node) => {
      if (node.type.name === nodeName) {
        foundNode = node
      }
    })

    return foundNode
  }

  const addSection = async ({
    section,
    options
  }: {
    section: NodeName
    options?: { data: any }
  }) => {
    const repository = await getRepositoryData({
      urlRepository: 'https://github.com/xavimondev/easyreadme'
    })
    if (!repository) return
    const repositoryTemplate = new RepositoryTemplate(repository!)
    const sectionItem = listSections.find((sec) => sec.id === section)

    if (
      (section === NodeName.CONTRIBUTORS && !sectionItem?.added) ||
      !SECTIONS_EXCLUDED_FROM_UPDATES.includes(section)
    ) {
      updateSection(section)
    }

    if (sectionItem?.added && !SECTIONS_EXCLUDED_FROM_UPDATES.includes(section)) {
      removeNodeFromEditor(section)
      return
    }

    const owner = repositoryTemplate.getRepoOwner()
    const repositoryName = repositoryTemplate.getRepoName()

    const endPos = editor?.state.doc.resolve(editor.state.doc.childCount).end() ?? 0

    if (section === NodeName.ACKNOWLEDGEMENTS) {
      editor?.chain().insertContentAt(endPos, '<Acknowledgments />').focus('end').run()
    } else if (section === NodeName.BADGE) {
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
    } else if (section === NodeName.BANNER) {
      editor?.chain().insertContentAt(endPos, '<Banner />').focus('end').run()
    } else if (section === NodeName.CHANGELOG) {
      editor?.chain().insertContentAt(endPos, '<Changelog />').focus('end').run()
    } else if (section === NodeName.COMMANDS) {
      editor?.chain().insertContentAt(endPos, '<Commands />').focus('end').run()
    } else if (section === NodeName.CONTRIBUTORS) {
      let nodeFound = null
      const node = findNodeByName(section)

      if (!node) {
        editor
          ?.chain()
          // @ts-ignore
          .insertContributors({
            endPos
          })
      } else {
        nodeFound = node
      }

      const { data } = options ?? {}
      let attrsData: any = {
        owner: owner
      }

      if (data === ContributorOption.TABLE) {
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

        attrsData = {
          listContributors
        }
      }

      if (!node) {
        // Updating content
        const endPosFinal = editor?.state.doc.resolve(editor?.state.doc.childCount).end() ?? -1 ?? 0
        nodeFound = editor?.state.tr.doc.nodeAt(endPosFinal)
      }

      const newContent = {
        ...nodeFound?.attrs,
        type: data,
        data: {
          ...attrsData,
          repository: repositoryName
        }
      }
      editor?.chain().updateAttributes(NodeName.CONTRIBUTORS, newContent).run()
    } else if (section === NodeName.DEPLOY) {
      editor?.chain().insertContentAt(endPos, '<Deploy />').focus('end').run()
    } else if (section === NodeName.FAQ) {
      editor?.chain().insertContentAt(endPos, '<Faq />').focus('end').run()
    } else if (section === NodeName.LICENSE) {
      const license = await getLicense({
        repoName: repositoryName,
        owner
      })
      // @ts-ignore
      editor?.chain().insertLicense({
        endPos,
        license
      })
    } else if (section === NodeName.OVERVIEW) {
      // @ts-ignore
      editor?.chain().insertOverview({ endPos, showPlaceholder: true })

      //Updating content
      const endPosFinal = editor?.state.doc.resolve(editor?.state.doc.childCount).end() ?? -1 ?? 0
      const nodoActual = editor?.state.tr.doc.nodeAt(endPosFinal)
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
      const newContent = {
        ...nodoActual?.attrs,
        content: overview,
        showPlaceholder: false
      }
      editor?.chain().updateAttributes(NodeName.OVERVIEW, newContent).run()
    } else if (section === NodeName.PREREQUISITES) {
      editor?.chain().insertContentAt(endPos, '<Prerequisites />').focus('end').run()
    } else if (section === NodeName.PROJECT_STRUCTURE) {
      const tree = await getRepositoryTreeDirectory({
        repoName: repositoryName,
        owner: owner,
        branch: repository?.branch
      })

      // @ts-ignore
      editor?.chain().insertProjectStructure({ endPos, tree })
    } else if (section === NodeName.PROJECT_SUMMARY) {
      // @ts-ignore
      editor?.chain().insertProjectSummary({ endPos, showPlaceholder: true })

      // Updating content
      const endPosFinal = editor?.state.doc.resolve(editor?.state.doc.childCount).end() ?? -1 ?? 0
      const nodoActual = editor?.state.tr.doc.nodeAt(endPosFinal)

      const prompt = await repositoryTemplate.getProjectSummaryJson()
      if (prompt === '') {
        const newContent = {
          ...nodoActual?.attrs,
          content: []
        }
        editor?.chain().updateAttributes(NodeName.PROJECT_SUMMARY, newContent).run()
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
      const newContent = {
        ...nodoActual?.attrs,
        content: response.data.data,
        showPlaceholder: false
      }
      editor?.chain().updateAttributes(NodeName.PROJECT_SUMMARY, newContent).run()
    } else if (section === NodeName.ROADMAP) {
      // @ts-ignore
      editor?.chain().insertContentAt(endPos, '<Roadmap />').focus('end').run()
    } else if (section === NodeName.RUN_LOCALLY) {
      // @ts-ignore
      editor?.chain().insertRunLocally({ endPos, mainLanguage: repository.language })
    } else if (section === NodeName.SETTING_UP) {
      // @ts-ignore
      editor?.chain().insertEnvVariablesGuide({ endPos, showPlaceholder: true })

      // Updating content
      const endPosFinal = editor?.state.doc.resolve(editor?.state.doc.childCount).end() ?? -1 ?? 0
      const nodoActual = editor?.state.tr.doc.nodeAt(endPosFinal)

      const prompt = await repositoryTemplate.getEnvironmentVariablesGuideJson()
      if (prompt === '') {
        const newContent = {
          ...nodoActual?.attrs,
          content: [],
          showPlaceholder: false
        }
        editor?.chain().updateAttributes(NodeName.SETTING_UP, newContent).run()
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
      const newContent = {
        ...nodoActual?.attrs,
        content: response.data.data,
        showPlaceholder: false
      }
      editor?.chain().updateAttributes(NodeName.SETTING_UP, newContent).run()
    } else if (section === NodeName.TECH_STACK) {
      // @ts-ignore
      editor?.chain().insertTechStack({ endPos, showPlaceholder: true })

      const prompt = await repositoryTemplate.getTechStackJson()

      // Updating content
      const endPosFinal = editor?.state.doc.resolve(editor?.state.doc.childCount).end() ?? -1 ?? 0
      const nodoActual = editor?.state.tr.doc.nodeAt(endPosFinal)

      if (prompt === '') {
        const newContent = {
          ...nodoActual?.attrs,
          content: [],
          showPlaceholder: false
        }
        editor?.chain().updateAttributes(NodeName.TECH_STACK, newContent).run()
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
      const newContent = {
        ...nodoActual?.attrs,
        content: response.data.dependencies,
        showPlaceholder: false
      }
      editor?.chain().updateAttributes(NodeName.TECH_STACK, newContent).run()
    } else if (section === NodeName.TABLE_CONTENTS) {
      // TODO: List by order in what items were added
      const sectionList = listSections.filter((sec) => sec.id !== section && sec.added)
      // @ts-ignore
      editor?.chain().insertTableContents({ endPos, content: sectionList })
    }
  }

  const customSections: Partial<Record<NodeName, JSX.Element>> = useMemo(() => {
    return {
      [NodeName.BADGE]: <BadgesOptions addSection={addSection} />,
      [NodeName.CONTRIBUTORS]: <ContributorsOptions addSection={addSection} />
    }
  }, [editor, addSection])

  const listSectionsFiltered = useMemo(() => {
    return filterSection !== '' && filterSection.length > 0
      ? listSections.filter((section) =>
          section.name.toLowerCase().includes(filterSection.toLowerCase())
        )
      : listSections
  }, [filterSection, listSections])

  return (
    <div className='h-full w-full grid grid-cols-1 md:grid-cols-[430px,_1fr] gap-3 mt-4 mx-2'>
      <div className='flex flex-col gap-2'>
        <Searcher setFilterSection={setFilterSection} />
        <ListSections
          listSections={listSectionsFiltered}
          customSections={customSections}
          addSection={addSection}
        />
      </div>
      <CustomEditor editor={editor} />
    </div>
  )
}
