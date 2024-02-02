import { BadgeName, NodeName, Section, SectionState } from '@/types/builder'
import { Template } from '@/types/readme'

import {
  parseBuildGradle,
  parseCargo,
  parseComposerJson,
  parseGoMod,
  parsePackageJson,
  parsePipFile,
  parsePom,
  parsePyProject,
  parseRequirementsTxt
} from '@/utils/parse'

export const LANGUAGES_SETUP = [
  {
    language: 'JavaScript',
    fileDependencies: ['package.json'],
    commands: {
      install: ['pnpm install', 'bun install', 'npm install', 'yarn install'],
      run: ['pnpm dev', 'bun dev', 'npm run dev', 'yarn dev'],
      test: ['npm run test']
    }
  },
  {
    language: 'TypeScript',
    fileDependencies: ['package.json'],
    commands: {
      install: ['pnpm install', 'bun install', 'npm install', 'yarn install'],
      run: ['pnpm dev', 'bun dev', 'npm run dev', 'yarn dev'],
      test: ['npm run test']
    }
  },
  {
    language: 'Svelte',
    fileDependencies: ['package.json'],
    commands: {
      install: ['pnpm install', 'bun install', 'npm install', 'yarn install'],
      run: ['pnpm dev', 'bun dev', 'npm run dev', 'yarn dev'],
      test: ['npm run test']
    }
  },
  {
    language: 'Astro',
    fileDependencies: ['package.json'],
    commands: {
      install: ['pnpm install', 'bun install', 'npm install', 'yarn install'],
      run: ['pnpm dev', 'bun dev', 'npm run dev', 'yarn dev'],
      test: ['npm run test']
    }
  },
  {
    language: 'Vue',
    fileDependencies: ['package.json'],
    commands: {
      install: ['pnpm install', 'bun install', 'npm install', 'yarn install'],
      run: ['pnpm dev', 'bun dev', 'npm run dev', 'yarn dev'],
      test: ['npm run test']
    }
  },
  {
    language: 'Python',
    fileDependencies: ['Pipfile', 'pyproject.toml', 'requirements.txt'],
    commands: {
      install: ['pip install -r requirements.txt'],
      run: ['python app.py'],
      test: ['pytest']
    }
  },
  {
    language: 'Java',
    fileDependencies: ['build.gradle', 'pom.xml'],
    commands: {
      install: ['mvn install'],
      run: ['java -jar app.jar'],
      test: ['mvn test']
    }
  },
  {
    language: 'PHP',
    fileDependencies: ['composer.json'],
    commands: {
      install: ['composer install'],
      run: ['php main.php'],
      test: ['phpunit']
    }
  },
  {
    language: 'Go',
    fileDependencies: ['go.mod'],
    commands: {
      install: ['go build -o myapp'],
      run: ['go run main.go'],
      test: ['go test']
    }
  },
  {
    language: 'Rust',
    fileDependencies: ['Cargo.toml'],
    commands: {
      install: ['cargo build'],
      run: ['cargo run'],
      test: ['cargo test']
    }
  }
]

export const LANGUAGES_FILES_PARSERS: Record<string, any> = {
  'package.json': parsePackageJson,
  Pipfile: parsePipFile,
  'pyproject.toml': parsePyProject,
  'requirements.txt': parseRequirementsTxt,
  'build.gradle': parseBuildGradle,
  'pom.xml': parsePom,
  'composer.json': parseComposerJson,
  'go.mod': parseGoMod,
  'cargo.toml': parseCargo
}

const BADGES_URL = 'https://img.shields.io/github'
export const FORKS_URL = `${BADGES_URL}/forks`
export const CODESIZE_URL = `${BADGES_URL}/languages/code-size`
export const STARS_URL = `${BADGES_URL}/stars`
export const WATCHERS_URL = `${BADGES_URL}/watchers`
export const CONTRIBUTORS_URL = `${BADGES_URL}/contributors`
export const LAST_COMMIT_URL = `${BADGES_URL}/last-commit`
export const LICENSE_URL = `${BADGES_URL}/license`
export const TOP_LANGUAGE_URL = `${BADGES_URL}/languages/top`
export const COMMIT_ACTIVITY_MONTH_URL = `${BADGES_URL}/commit-activity/m`
export const DISCUSSIONS_URL = `${BADGES_URL}/discussions`
export const ISSUES_URL = `${BADGES_URL}/issues`
export const PULL_REQUESTS_URL = `${BADGES_URL}/issues-pr`
export const DEPLOYMENTS_URL = `${BADGES_URL}/deployments`

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

export const APP_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://easyreadme.vercel.app'

export const RATE_LIMIT = 3

export const DEFAULT_CONTENT = `<p style="text-align:center;">
<img src='illustrations/process.svg' height="30%" width="30%" alt="Illustration" />
</p>

<p></p>
<p></p>

# ✨ Welcome to easyreadme

Ready to create a stunning README for your project? 👀


1. **Enter your GitHub Repository URL 🔗**.
2. **Choose a template that suits your project 🤔**.
3. **Click the Generate ⚡️ Button**.
`

export const LIST_BADGES: { id: BadgeName; name: string }[] = [
  { id: 'forks', name: 'Forks' },
  { id: 'codesize', name: 'Codesize' },
  { id: 'stars', name: 'Stars' },
  { id: 'watchers', name: 'Watchers' },
  { id: 'contributors', name: 'Contributors' },
  { id: 'last_commit', name: 'Last Commit' },
  { id: 'license', name: 'License' },
  { id: 'top_language', name: 'Language' },
  { id: 'discussions', name: 'Discussions' },
  { id: 'issues', name: 'Issues' },
  { id: 'pull_requests', name: 'Pull Request' },
  { id: 'deployment', name: 'Deployment' },
  { id: 'commit_activity_month', name: 'Commits' }
]

export const README_SECTIONS_DATA: Section[] = [
  {
    id: NodeName.BANNER,
    name: 'Banner',
    emoji: '🏞️',
    description: 'Picture of your project.'
  },
  {
    id: NodeName.TECH_STACK,
    name: 'Stack',
    emoji: '💻',
    description: 'Information about the technology stack used in the project.'
  },
  {
    id: NodeName.PROJECT_SUMMARY,
    name: 'Project Summary',
    emoji: '📝',
    description: 'A brief summary of the project.'
  },
  {
    id: NodeName.SETTING_UP,
    name: 'Setting Up',
    emoji: '⚙️',
    description: 'Instructions on setting up the project.'
  },
  {
    id: NodeName.RUN_LOCALLY,
    name: 'Run Locally',
    emoji: '🚀',
    description: 'Guidelines on running the project locally.'
  },
  {
    id: NodeName.CONTRIBUTORS,
    name: 'Contributors',
    emoji: '🙌',
    description: 'Recognition about project contributors.'
  },
  {
    id: NodeName.LICENSE,
    name: 'License',
    emoji: '📄',
    description: 'Details about the licensing of the project.'
  },
  {
    id: NodeName.PROJECT_STRUCTURE,
    name: 'Project Structure',
    emoji: '📁',
    description: 'Overview of the structure of the project.'
  },
  {
    id: NodeName.DEPLOY,
    name: 'Deploy',
    emoji: '☁️',
    description: 'Instructions on deploying the project.'
  },
  {
    id: NodeName.ROADMAP,
    name: 'Roadmap',
    emoji: '🗺️',
    description: 'The planned development path of the project.'
  },
  {
    id: NodeName.ACKNOWLEDGEMENTS,
    name: 'Acknowledgements',
    emoji: '🙏',
    description: 'Highlighting invaluable support.'
  },
  {
    id: NodeName.CHANGELOG,
    name: 'Changelog',
    emoji: '📜',
    description: 'Record of changes made to the project.'
  },
  {
    id: NodeName.PREREQUISITES,
    name: 'Prerequisites',
    emoji: '✅',
    description: 'List of dependencies needed to use the project.'
  },
  {
    id: NodeName.FAQ,
    name: 'FAQ',
    emoji: '🤔',
    description: 'Questions and their answers related to the project.'
  },
  {
    id: NodeName.COMMANDS,
    name: 'Commands',
    emoji: '⚡',
    description: 'Commonly used commands or actions in the project.'
  },
  {
    id: NodeName.TABLE_CONTENTS,
    name: 'Table of Contents',
    emoji: '🔍',
    description: 'An organized list of contents for easy navigation.'
  },
  {
    id: NodeName.OVERVIEW,
    name: 'Overview',
    emoji: '📌',
    description: 'An Overview for high-level project understanding.'
  },
  {
    id: NodeName.BADGE,
    name: 'Badges',
    emoji: '🛡️',
    description: 'Show metrics for your project.'
  }
]

export const NODE_DEFAULT_VALUES: Record<string, { default: any }> = {
  endPos: {
    default: 0
  },
  showPlaceholder: {
    default: false
  }
}

export const INITIAL_STATE_SECTIONS: SectionState[] = README_SECTIONS_DATA.map((section) => {
  return {
    ...section,
    added: false
  }
})

export const SECTIONS_EXCLUDED_FROM_UPDATES = [NodeName.CONTRIBUTORS, NodeName.BADGE]
export const SECTIONS_EXCLUDED_FROM_TABLE_CONTENTS = [
  NodeName.TABLE_CONTENTS,
  NodeName.BADGE,
  NodeName.BANNER
]

export const COOKIE_NAME = 'apikey-ai'
