import { NodeName, Section } from '@/types/builder'

export const README_SECTIONS_DATA: Section[] = [
  {
    id: NodeName.BANNER,
    name: 'Banner',
    emoji: '🏞️',
    description: 'Picture of your project.',
    add: async ({ editor, endPos }) => {
      editor.chain().insertContentAt(endPos, '<Banner />').focus('end').run()
    }
  },
  {
    id: NodeName.TECH_STACK,
    name: 'Stack',
    emoji: '💻',
    description: 'Information about the technology stack used in the project.',
    add: async ({ editor, endPos, data }) => {
      editor.chain().insertTechStack({ endPos, ...data })
    }
  },
  {
    id: NodeName.PROJECT_SUMMARY,
    name: 'Project Summary',
    emoji: '📝',
    description: 'A brief summary of the project.',
    add: async ({ editor, endPos, data }) => {
      editor.chain().insertProjectSummary({ endPos, ...data })
    }
  },
  {
    id: NodeName.SETTING_UP,
    name: 'Setting Up',
    emoji: '⚙️',
    description: 'Instructions on setting up the project.',
    add: async ({ editor, endPos, data }) => {
      editor.chain().insertEnvVariablesGuide({ endPos, ...data })
    }
  },
  {
    id: NodeName.RUN_LOCALLY,
    name: 'Run Locally',
    emoji: '🚀',
    description: 'Guidelines on running the project locally.',
    add: async ({ editor, endPos, data }) => {
      editor.chain().insertRunLocally({ endPos, data })
    }
  },
  {
    id: NodeName.CONTRIBUTORS,
    name: 'Contributors',
    emoji: '🙌',
    description: 'Recognition about project contributors.',
    add: async ({ editor, endPos, data }) => {
      editor.chain().insertContributors({ endPos, data })
    }
  },
  {
    id: NodeName.LICENSE,
    name: 'License',
    emoji: '📄',
    description: 'Details about the licensing of the project.',
    add: async ({ editor, endPos, data }) => {
      editor.chain().insertLicense({
        endPos,
        license: data
      })
    }
  },
  {
    id: NodeName.PROJECT_STRUCTURE,
    name: 'Project Structure',
    emoji: '📁',
    description: 'Overview of the structure of the project.',
    add: async ({ editor, endPos, data }) => {
      editor.chain().insertProjectStructure({
        endPos,
        tree: data
      })
    }
  },
  {
    id: NodeName.DEPLOY,
    name: 'Deploy',
    emoji: '☁️',
    description: 'Instructions on deploying the project.',
    add: async ({ editor, endPos }) => {
      editor.chain().insertContentAt(endPos, '<Deploy />').focus('end').run()
    }
  },
  {
    id: NodeName.ROADMAP,
    name: 'Roadmap',
    emoji: '🗺️',
    description: 'The planned development path of the project.',
    add: async ({ editor, endPos }) => {
      editor.chain().insertContentAt(endPos, '<Roadmap />').focus('end').run()
    }
  },
  {
    id: NodeName.ACKNOWLEDGEMENTS,
    name: 'Acknowledgements',
    emoji: '🙏',
    description: 'Highlighting invaluable support.',
    add: async ({ editor, endPos }) => {
      editor.chain().insertContentAt(endPos, '<Acknowledgments />').focus('end').run()
    }
  },
  {
    id: NodeName.CHANGELOG,
    name: 'Changelog',
    emoji: '📜',
    description: 'Record of changes made to the project.',
    add: async ({ editor, endPos }) => {
      editor.chain().insertContentAt(endPos, '<Changelog />').focus('end').run()
    }
  },
  {
    id: NodeName.PREREQUISITES,
    name: 'Prerequisites',
    emoji: '✅',
    description: 'List of dependencies needed to use the project.',
    add: async ({ editor, endPos }) => {
      editor.chain().insertContentAt(endPos, '<Prerequisites />').focus('end').run()
    }
  },
  {
    id: NodeName.FAQ,
    name: 'FAQ',
    emoji: '🤔',
    description: 'Questions and their answers related to the project.',
    add: async ({ editor, endPos }) => {
      editor.chain().insertContentAt(endPos, '<Faq />').focus('end').run()
    }
  },
  {
    id: NodeName.COMMANDS,
    name: 'Commands',
    emoji: '⚡',
    description: 'Commonly used commands or actions in the project.',
    add: async ({ editor, endPos }) => {
      editor.chain().insertContentAt(endPos, '<Commands />').focus('end').run()
    }
  },
  {
    id: NodeName.TABLE_CONTENTS,
    name: 'Table of Contents',
    emoji: '🔍',
    description: 'An organized list of contents for easy navigation.',
    add: async ({ editor, endPos }) => {
      editor.chain().insertTableContents({ endPos })
    }
  },
  {
    id: NodeName.OVERVIEW,
    name: 'Overview',
    emoji: '📌',
    description: 'An Overview for high-level project understanding.',
    add: async ({ editor, endPos, data }) => {
      editor.chain().insertOverview({ endPos, ...data })
    }
  },
  {
    id: NodeName.BADGE,
    name: 'Badges',
    emoji: '🛡️',
    description: 'Show metrics for your project.',
    add({ editor, endPos, data }) {
      const { badges, owner, repoName } = data
      for (let i = 0; i < badges.length; i++) {
        const badge = badges.at(i)
        if (!badge) return
        const pos = endPos + i
        const { name, url, isGithub } = badge ?? {}
        const badgeUrl = isGithub ? `${url}/${owner}/${repoName}` : url
        editor.chain().insertBadge({
          endPos: pos,
          data: {
            label: name,
            url: badgeUrl
          }
        })
      }
    }
  },
  {
    id: NodeName.API_REFERENCE,
    name: 'Api Reference',
    emoji: '🚀',
    description: 'All the information required to work with the API.',
    add: async ({ editor, endPos }) => {
      editor.chain().insertApiReference({
        endPos
      })
    }
  },
  {
    id: NodeName.FEEDBACK,
    name: 'Feedback',
    emoji: '🫶',
    description: 'Share your thoughts, suggestions, and concerns.',
    add: async ({ editor, endPos }) => {
      editor.chain().insertFeedback({
        endPos
      })
    }
  },
  {
    id: NodeName.LIB_PROPS,
    name: 'Table Props',
    emoji: '🧾',
    description: 'Table that contains your NPM package props.',
    add: async ({ editor, endPos }) => {
      editor.chain().insertLibProps({
        endPos
      })
    }
  }
]
