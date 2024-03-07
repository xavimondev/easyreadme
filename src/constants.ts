import { NodeName } from '@/types/builder'

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
    languages: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Svelte', 'Astro', 'Vue', 'Angular'],
    fileDependencies: ['package.json'],
    lockFiles: [
      {
        id: 'bun',
        lockfile: 'bun.lockb',
        url: 'https://bun.sh/docs/installation',
        text: 'To check that bun was installed successfully, open a new terminal window and run bun --version.'
      },
      {
        id: 'deno',
        lockfile: 'deno.lock',
        url: 'https://docs.deno.com/runtime/manual',
        text: 'Install following the instructions for your operating system. To test your installation, open a new terminal and run `deno --version`.'
      },
      {
        id: 'pnpm',
        lockfile: 'pnpm-lock.yaml',
        url: 'https://pnpm.io/installation',
        text: 'To check that pnpm was installed successfully, open a new terminal window and run `pnpm --version`.'
      },
      {
        id: 'npm',
        lockfile: 'package-lock.json',
        url: 'https://nodejs.org/en',
        text: 'To check that npm was installed successfully, open a new terminal window and run `npm --version`.'
      },
      {
        id: 'yarn',
        lockfile: 'yarn.lock',
        url: 'https://classic.yarnpkg.com/en/docs/install#mac-stable',
        text: 'To check that yarn was installed successfully, open a new terminal window and run `yarn --version`.'
      }
    ],
    runtimes: [
      {
        id: 'Node',
        url: 'https://nodejs.org/en',
        text: 'Install following the instructions for your operating system. Then, open a new terminal and run `node --version`.'
      },
      {
        id: 'Deno',
        url: 'https://deno.com',
        text: 'Install following the instructions for your operating system. Then, open a new terminal and run `deno --version`.'
      }
    ],
    typescriptResource: {
      id: 'TypeScript',
      url: 'https://www.typescriptlang.org/download',
      text: 'Download and install following the instructions.'
    },
    commands: {
      install: ['pnpm install', 'bun install', 'npm install', 'yarn install'],
      run: ['pnpm dev', 'bun dev', 'npm run dev', 'yarn dev'],
      test: ['npm run test']
    }
  },
  {
    languages: ['Python'],
    fileDependencies: ['Pipfile', 'pyproject.toml', 'requirements.txt'],
    installation: [
      {
        id: 'Python',
        url: 'https://www.python.org/downloads/',
        text: 'Download and install Python following the instructions for your operating system. To test your installation, run `python --version`'
      },
      {
        id: 'pip',
        url: 'https://pypi.org/project/pip/',
        text: 'Python generally includes pip. If not or if you need to update it, run `python -m pip install --upgrade pip`.'
      }
    ],
    commands: {
      install: ['pip install -r requirements.txt'],
      run: ['python app.py'],
      test: ['pytest']
    }
  },
  {
    languages: ['Java'],
    fileDependencies: ['build.gradle', 'pom.xml'],
    installation: [
      {
        id: 'JDK',
        url: 'https://www.oracle.com/java/technologies/downloads/',
        text: 'Download and install Java JDK or use a distribution like OpenJDK.'
      },
      {
        id: 'Maven',
        url: 'https://maven.apache.org/install.html',
        text: 'Download and install Maven following the instructions for your operating system.'
      }
    ],
    commands: {
      install: ['mvn install'],
      run: ['java -jar app.jar'],
      test: ['mvn test']
    }
  },
  {
    languages: ['PHP'],
    fileDependencies: ['composer.json'],
    installation: [
      {
        id: 'PHP',
        url: 'https://www.php.net/downloads.php',
        text: 'Download and install PHP following the instructions for your operating system. To test your installation, open a new terminal and run `php version`.'
      },
      {
        id: 'composer',
        url: 'https://getcomposer.org/download/',
        text: 'Install Composer by following the instructions. Then, run `composer -v` to test your installation.'
      }
    ],
    commands: {
      install: ['composer install'],
      run: ['php main.php'],
      test: ['phpunit']
    }
  },
  {
    languages: ['Go'],
    fileDependencies: ['go.mod'],
    installation: [
      {
        id: 'Go',
        url: 'https://go.dev/doc/install',
        text: 'Install Go following the instructions for your operating system. To test your installation, open a new terminal and run `go version`.'
      }
    ],
    commands: {
      install: ['go build -o myapp'],
      run: ['go run main.go'],
      test: ['go test']
    }
  },
  {
    languages: ['Rust'],
    fileDependencies: ['Cargo.toml'],
    installation: [
      {
        id: 'Rust',
        url: 'https://www.rust-lang.org/tools/install',
        text: 'Install Rust following the instructions for your operating system. To test your installation, open a new terminal and run `rustc --version`'
      }
    ],
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

export const APP_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://easyreadme.vercel.app'

export const RATE_LIMIT = 3

export const NODE_DEFAULT_VALUES: Record<string, { default: any }> = {
  endPos: {
    default: 0
  }
}

export const SECTIONS_EXCLUDED_FROM_TABLE_CONTENTS = [
  NodeName.TABLE_CONTENTS,
  NodeName.BADGE,
  NodeName.BANNER
]

export const COOKIE_NAME = 'apikey-ai'

export const DEFAULT_PREREQUISITES = [
  {
    id: 'Git',
    url: 'https://git-scm.com/book/en/v2/Getting-Started-Installing-Git',
    text: 'Download and install Git following the instructions for your operating system. To check that Git was installed successfully, run `git --version`.'
  },
  {
    id: 'Visual Studio Code',
    url: 'https://code.visualstudio.com/',
    text: 'A lightweight powerful source code editor.'
  }
]
