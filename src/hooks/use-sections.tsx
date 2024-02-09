import { useCallback } from 'react'

import { useBuilder } from '@/store'

export function useSections() {
  const readmeEditor = useBuilder((store) => store.readmeEditor)

  const addAcknowledgment = useCallback(
    ({ endPos }: { endPos: number }) => {
      readmeEditor?.chain().insertContentAt(endPos, '<Acknowledgments />').focus('end').run()
    },
    [readmeEditor]
  )

  const addAlert = useCallback(
    ({ endPos, id }: { endPos: number; id: string }) => {
      readmeEditor?.chain().insertAlert({
        endPos,
        id
      })
    },
    [readmeEditor]
  )

  const addBanner = useCallback(
    ({ endPos }: { endPos: number }) => {
      readmeEditor?.chain().insertContentAt(endPos, '<Banner />').focus('end').run()
    },
    [readmeEditor]
  )

  const addChangelog = useCallback(
    ({ endPos }: { endPos: number }) => {
      readmeEditor?.chain().insertContentAt(endPos, '<Changelog />').focus('end').run()
    },
    [readmeEditor]
  )

  const addCommands = useCallback(
    ({ endPos }: { endPos: number }) => {
      readmeEditor?.chain().insertContentAt(endPos, '<Commands />').focus('end').run()
    },
    [readmeEditor]
  )

  const addDeploy = useCallback(
    ({ endPos }: { endPos: number }) => {
      readmeEditor?.chain().insertContentAt(endPos, '<Deploy />').focus('end').run()
    },
    [readmeEditor]
  )

  const addFaq = useCallback(
    ({ endPos }: { endPos: number }) => {
      readmeEditor?.chain().insertContentAt(endPos, '<Faq />').focus('end').run()
    },
    [readmeEditor]
  )

  const addLicense = useCallback(
    ({ endPos, license }: { endPos: number; license: any }) => {
      readmeEditor?.chain().insertLicense({
        endPos,
        license
      })
    },
    [readmeEditor]
  )

  const addPrerequisites = useCallback(
    ({ endPos }: { endPos: number }) => {
      readmeEditor?.chain().insertContentAt(endPos, '<Prerequisites />').focus('end').run()
    },
    [readmeEditor]
  )

  const addProjectStructure = useCallback(
    ({ endPos, tree }: { endPos: number; tree: string }) => {
      readmeEditor?.chain().insertProjectStructure({ endPos, tree })
    },
    [readmeEditor]
  )

  const addRoadmap = useCallback(
    ({ endPos }: { endPos: number }) => {
      readmeEditor?.chain().insertContentAt(endPos, '<Roadmap />').focus('end').run()
    },
    [readmeEditor]
  )

  const addRunLocally = useCallback(
    ({ endPos, data }: { endPos: number; data: any }) => {
      readmeEditor?.chain().insertRunLocally({ endPos, data })
    },
    [readmeEditor]
  )

  const addTableOfContent = useCallback(
    ({ endPos }: { endPos: number }) => {
      readmeEditor?.chain().insertTableContents({ endPos })
    },
    [readmeEditor]
  )

  const addBadge = useCallback(
    ({ endPos, data }: { endPos: number; data: any }) => {
      readmeEditor?.chain().insertBadge({
        endPos,
        data
      })
    },
    [readmeEditor]
  )

  const addContributor = useCallback(
    ({ endPos, data }: { endPos: number; data?: any }) => {
      readmeEditor?.chain().insertContributors({
        endPos,
        data
      })
    },
    [readmeEditor]
  )

  const addOverview = useCallback(
    ({ endPos, data }: { endPos: number; data: any }) => {
      readmeEditor?.chain().insertOverview({ endPos, ...data })
    },
    [readmeEditor]
  )

  const addProjectSummary = useCallback(
    ({ endPos, data }: { endPos: number; data: any }) => {
      readmeEditor?.chain().insertProjectSummary({ endPos, ...data })
    },
    [readmeEditor]
  )

  const addSettingUpGuide = useCallback(
    ({ endPos, data }: { endPos: number; data: any }) => {
      readmeEditor?.chain().insertEnvVariablesGuide({ endPos, ...data })
    },
    [readmeEditor]
  )

  const addTechStack = useCallback(
    ({ endPos, data }: { endPos: number; data: any }) => {
      readmeEditor?.chain().insertTechStack({ endPos, ...data })
    },
    [readmeEditor]
  )

  const addApiReference = useCallback(
    ({ endPos }: { endPos: number }) => {
      readmeEditor?.chain().insertApiReference({
        endPos
      })
    },
    [readmeEditor]
  )

  const addFeedback = useCallback(
    ({ endPos }: { endPos: number }) => {
      readmeEditor?.chain().insertFeedback({
        endPos
      })
    },
    [readmeEditor]
  )

  return {
    addAcknowledgment,
    addBadge,
    addBanner,
    addChangelog,
    addCommands,
    addContributor,
    addDeploy,
    addFaq,
    addLicense,
    addOverview,
    addPrerequisites,
    addProjectStructure,
    addProjectSummary,
    addRoadmap,
    addRunLocally,
    addTableOfContent,
    addTechStack,
    addSettingUpGuide,
    addAlert,
    addApiReference,
    addFeedback
  }
}
