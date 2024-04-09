import { NodeName } from '@/types/builder'
import { Template } from '@/types/readme'

export const LIST_TEMPLATES: Template[] = [
  {
    nameTemplate: 'Minimal',
    description:
      'Simplify README creation effortlessly. Craft clear and user-friendly project documentation using this template.',
    sections: [
      NodeName.OVERVIEW,
      NodeName.PREREQUISITES,
      NodeName.SETTING_UP,
      NodeName.RUN_LOCALLY,
      NodeName.DEPLOY,
      NodeName.LICENSE
    ],
    tags: ['Simple', 'User-friendly', 'Documentation']
  },
  {
    nameTemplate: 'Collaborate',
    description:
      'Streamline setup, development, and collaboration processes for smoother project execution.',
    sections: [
      NodeName.BANNER,
      NodeName.BADGE,
      NodeName.TABLE_CONTENTS,
      NodeName.TECH_STACK,
      NodeName.PROJECT_SUMMARY,
      NodeName.SETTING_UP,
      NodeName.RUN_LOCALLY,
      NodeName.CONTRIBUTORS,
      NodeName.FAQ,
      NodeName.LICENSE
    ],
    tags: ['Collaboration', 'Development', 'Efficiency']
  },
  {
    nameTemplate: 'Inspire',
    description:
      'From project structure to deployment, Inspire streamlines every aspect for seamless development and collaboration.',
    sections: [
      NodeName.TABLE_CONTENTS,
      NodeName.OVERVIEW,
      NodeName.PROJECT_STRUCTURE,
      NodeName.PROJECT_SUMMARY,
      NodeName.TECH_STACK,
      NodeName.SETTING_UP,
      NodeName.RUN_LOCALLY,
      NodeName.DEPLOY,
      NodeName.LICENSE
    ],
    tags: ['Inspiration', 'Seamless', 'Structure']
  },
  {
    nameTemplate: 'NPM Package',
    description: 'Ideal for libraries, CLI commands, and all kind of packages.',
    sections: [
      NodeName.BADGE,
      NodeName.OVERVIEW,
      NodeName.RUN_LOCALLY,
      NodeName.LIB_PROPS,
      NodeName.CHANGELOG,
      NodeName.ROADMAP,
      NodeName.FAQ,
      NodeName.CONTRIBUTORS,
      NodeName.LICENSE
    ],
    tags: ['Library', 'Integration', 'Contribution']
  },
  {
    nameTemplate: 'API',
    description:
      'Accelerate development by providing clear and concise information on endpoints and usage.',
    sections: [
      NodeName.BADGE,
      NodeName.OVERVIEW,
      NodeName.PREREQUISITES,
      NodeName.RUN_LOCALLY,
      NodeName.API_REFERENCE,
      NodeName.ACKNOWLEDGEMENTS,
      NodeName.CONTRIBUTORS,
      NodeName.LICENSE
    ],
    tags: ['Backend', 'Endpoints', 'API']
  },
  {
    nameTemplate: 'VS Code Extension',
    description:
      'Guide users through installation, showcase features, and provide detailed usage instructions.',
    sections: [
      NodeName.BANNER,
      NodeName.OVERVIEW,
      NodeName.RUN_LOCALLY,
      NodeName.COMMANDS,
      NodeName.CHANGELOG,
      NodeName.FAQ,
      NodeName.CONTRIBUTORS,
      NodeName.LICENSE
    ],
    tags: ['VS Code', 'Installation', 'Features']
  },
  {
    nameTemplate: 'Monorepos',
    description:
      'An overview of monorepo facilitating modular development and code sharing across projects.',
    sections: [
      NodeName.BANNER,
      NodeName.BADGE,
      NodeName.TABLE_CONTENTS,
      NodeName.OVERVIEW,
      NodeName.PREREQUISITES,
      NodeName.MONOREPO_SUMMARY,
      NodeName.TECH_STACK,
      NodeName.FAQ,
      NodeName.CONTRIBUTORS,
      NodeName.LICENSE
    ],
    tags: ['Monorepos', 'Workspaces', 'JavaScript']
  }
]
