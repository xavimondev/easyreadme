import { BadgeName, NodeName } from '@/types/builder'

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

export const NODE_DEFAULT_VALUES: Record<string, { default: any }> = {
  endPos: {
    default: 0
  }
}

export const SECTIONS_EXCLUDED_FROM_TABLE_CONTENTS = [
  NodeName.TABLE_CONTENTS,
  NodeName.BADGE,
  NodeName.BANNER,
  NodeName.ALERT
]

export const COOKIE_NAME = 'apikey-ai'
