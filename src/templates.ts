import { NodeName } from '@/types/builder'
import { Template } from '@/types/readme'

export const LIST_TEMPLATES: Template[] = [
  {
    srcImage: '/templates/minimal.webp',
    altImage: 'Screenshot template Minimal',
    nameTemplate: 'Minimal',
    description:
      'Simplify README creation effortlessly. Craft clear and user-friendly project documentation using this template.',
    sections: [
      NodeName.OVERVIEW,
      NodeName.SETTING_UP,
      NodeName.RUN_LOCALLY,
      NodeName.DEPLOY,
      NodeName.LICENSE
    ]
  },
  {
    srcImage: '/templates/collaborate.webp',
    altImage: 'Screenshot template Collaborate',
    nameTemplate: 'Collaborate',
    description:
      'Enhance project collaboration with comprehensive project docs. Streamline setup, development, and collaboration processes for smoother project execution.',
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
    ]
  },
  {
    srcImage: '/templates/inspire.webp',
    altImage: 'Screenshot template Inspire',
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
    ]
  },
  {
    srcImage: '/templates/empower.webp',
    altImage: 'Screenshot template Empower',
    nameTemplate: 'Empower',
    description:
      'Empower your project with structured documentation. Facilitate setup, development, and future planning for a more impactful project.',
    sections: [
      NodeName.BANNER,
      NodeName.BADGE,
      NodeName.TABLE_CONTENTS,
      NodeName.OVERVIEW,
      NodeName.PREREQUISITES,
      NodeName.TECH_STACK,
      NodeName.CONTRIBUTORS,
      NodeName.ACKNOWLEDGEMENTS,
      NodeName.CHANGELOG,
      NodeName.ROADMAP,
      NodeName.DEPLOY
    ]
  }
]
