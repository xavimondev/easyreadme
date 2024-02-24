import { BadgeItem, BadgeOption } from './types/builder'

const BADGES_URL = 'https://img.shields.io/github'

// + owner / reponame
const FORKS_URL = `${BADGES_URL}/forks`
const CODESIZE_URL = `${BADGES_URL}/languages/code-size`
const STARS_URL = `${BADGES_URL}/stars`
const WATCHERS_URL = `${BADGES_URL}/watchers`
const CONTRIBUTORS_URL = `${BADGES_URL}/contributors`
const LAST_COMMIT_URL = `${BADGES_URL}/last-commit`
const LICENSE_URL = `${BADGES_URL}/license`
const TOP_LANGUAGE_URL = `${BADGES_URL}/languages/top`
const COMMIT_ACTIVITY_MONTH_URL = `${BADGES_URL}/commit-activity/m`
const DISCUSSIONS_URL = `${BADGES_URL}/discussions`
const ISSUES_URL = `${BADGES_URL}/issues`
const PULL_REQUESTS_URL = `${BADGES_URL}/issues-pr`
// TODO: is this important?
// const DEPLOYMENTS_URL = `${BADGES_URL}/deployments`
const RELEASE_URL = `${BADGES_URL}/release`

const LIST_GITHUB_BADGES: BadgeItem[] = [
  { id: 'forks', name: 'Forks', url: FORKS_URL },
  { id: 'codesize', name: 'Codesize', url: CODESIZE_URL },
  { id: 'stars', name: 'Stars', url: STARS_URL },
  { id: 'watchers', name: 'Watchers', url: WATCHERS_URL },
  { id: 'contributors', name: 'Contributors', url: CONTRIBUTORS_URL },
  { id: 'last_commit', name: 'Last Commit', url: LAST_COMMIT_URL },
  { id: 'license', name: 'License', url: LICENSE_URL },
  { id: 'top_language', name: 'Language', url: TOP_LANGUAGE_URL },
  { id: 'discussions', name: 'Discussions', url: DISCUSSIONS_URL },
  { id: 'issues', name: 'Issues', url: ISSUES_URL },
  { id: 'pull_requests', name: 'Pull Request', url: PULL_REQUESTS_URL },
  // { id: 'deployment', name: 'Deployment', url: DEPLOYMENTS_URL },
  { id: 'commit_activity_month', name: 'Commits', url: COMMIT_ACTIVITY_MONTH_URL },
  { id: 'release', name: 'Release', url: RELEASE_URL }
]

const BADGES_TEC_URL = 'https://img.shields.io/badge'

const JAVASCRIPT_URL = `${BADGES_TEC_URL}/JavaScript-yellow?logo=javascript&logoColor=white`
const PYTHON_URL = `${BADGES_TEC_URL}/Python-blue?logo=python&logoColor=white`
const NODEJS_URL = `${BADGES_TEC_URL}/Node.js-green?logo=node.js&logoColor=white`
const REACT_URL = `${BADGES_TEC_URL}/React-blue?logo=react&logoColor=white`
const VUEJS_URL = `${BADGES_TEC_URL}/Vue.js-green?logo=vue.js&logoColor=white`
const DOCKER_URL = `${BADGES_TEC_URL}/Docker-blue?logo=docker&logoColor=white`
const HTML5_URL = `${BADGES_TEC_URL}/HTML5-orange?logo=html5&logoColor=white`
const CSS3_URL = `${BADGES_TEC_URL}/CSS3-blue?logo=css3&logoColor=white`
const MONGODB_URL = `${BADGES_TEC_URL}/MongoDB-green?logo=mongodb&logoColor=white`
const MYSQL_URL = `${BADGES_TEC_URL}/MySQL-blue?logo=mysql&logoColor=white`
const POSTGRESQL_URL = `${BADGES_TEC_URL}/PostgreSQL-blue?logo=postgresql&logoColor=white`
const AWS_URL = `${BADGES_TEC_URL}/AWS-232F3E?logo=amazon-aws&logoColor=white`
const KUBERNETES_URL = `${BADGES_TEC_URL}/Kubernetes-blue?logo=kubernetes&logoColor=white`
const SWIFT_URL = `${BADGES_TEC_URL}/Swift-orange?logo=swift&logoColor=white`
const ANDROID_URL = `${BADGES_TEC_URL}/Android-green?logo=android&logoColor=white`
const RUBY_URL = `${BADGES_TEC_URL}/Ruby-red?logo=ruby&logoColor=white`
const CPP_URL = `${BADGES_TEC_URL}/C++-blue?logo=c%2B%2B&logoColor=white`
const JAVA_URL = `${BADGES_TEC_URL}/Java-red?logo=java&logoColor=white`
const ANGULAR_URL = `${BADGES_TEC_URL}/Angular-red?logo=angular&logoColor=white`
const GRAPHQL_URL = `${BADGES_TEC_URL}/GraphQL-lightgrey?logo=graphql&logoColor=white`
const SPRING_BOOT_URL = `${BADGES_TEC_URL}/Spring%20Boot-brightgreen?logo=spring&logoColor=white`
const FLUTTER_URL = `${BADGES_TEC_URL}/Flutter-blue?logo=flutter&logoColor=white`
const RUBY_ON_RAILS_URL = `${BADGES_TEC_URL}/Ruby%20on%20Rails-red?logo=ruby-on-rails&logoColor=white`
const GO_URL = `${BADGES_TEC_URL}/Go-blue?logo=go&logoColor=white`
const SWIFTUI_URL = `${BADGES_TEC_URL}/SwiftUI-orange?logo=swift&logoColor=white`
const RUST_URL = `${BADGES_TEC_URL}/Rust-orange?logo=rust&logoColor=white`
const C_SHARP_URL = `${BADGES_TEC_URL}/C%23-blue?logo=c-sharp&logoColor=white`
const TAURI_URL = `${BADGES_TEC_URL}/Tauri-000000?logo=tauri`
const TAILWIND_CSS_URL = `${BADGES_TEC_URL}/Tailwind%20CSS-0F172A?logo=tailwind-css&logoColor=38BDF9`
const ASTRO_URL = `${BADGES_TEC_URL}/Astro-BC52EE?logo=astro&logoColor=white`
const SVELTE_URL = `${BADGES_TEC_URL}/Svelte-FF3E00?logo=svelte&logoColor=white`
const VERCEL_URL = `${BADGES_TEC_URL}/Vercel-000000?logo=vercel&logoColor=white`
const SUPABASE_URL = `${BADGES_TEC_URL}/Supabase-1C1C1C?logo=supabase&logoColor=6CCD93`
const CLOUDFLARE_URL = `${BADGES_TEC_URL}/Cloudflare%20Workers-F38020?logo=cloudflare&logoColor=white`
const GOOGLE_CLOUD_URL = `${BADGES_TEC_URL}/Google%20Cloud%20Platform-4285F4?logo=google-cloud&logoColor=white`
const AZURE_URL = `${BADGES_TEC_URL}/Azure-0089D6?logo=microsoft-azure&logoColor=white`
const PHP_URL = `${BADGES_TEC_URL}/PHP-525B8F?logo=php&logoColor=white`
const REACT_NATIVE_URL = `${BADGES_TEC_URL}/React%20Native-21232A?logo=react&logoColor=82D7F7`
const ELECTRON_URL = `${BADGES_TEC_URL}/Electron-47848F?logo=electron&logoColor=white`
const NETLIFY_URL = `${BADGES_TEC_URL}/Netlify-00C7B7?logo=netlify&logoColor=white`
const HEROKU_URL = `${BADGES_TEC_URL}/Heroku-430098?logo=heroku&logoColor=white`
const TYPESCRIPT_URL = `${BADGES_TEC_URL}/TypeScript-3178C6?logo=typescript&logoColor=white`
const DART_URL = `${BADGES_TEC_URL}/Dart-0175C2?logo=dart&logoColor=white`

const LIST_CLOUD_BADGES: BadgeItem[] = [
  { id: 'supabase', name: 'Supabase', url: SUPABASE_URL },
  { id: 'cloudflare', name: 'Cloudflare', url: CLOUDFLARE_URL },
  { id: 'google-cloud', name: 'Google Cloud', url: GOOGLE_CLOUD_URL },
  { id: 'azure', name: 'Azure', url: AZURE_URL },
  { id: 'aws', name: 'AWS', url: AWS_URL }
]

const LIST_DB_BADGES: BadgeItem[] = [
  { id: 'mongodb', name: 'MongoDB', url: MONGODB_URL },
  { id: 'mysql', name: 'MySQL', url: MYSQL_URL },
  { id: 'postgresql', name: 'PostgreSQL', url: POSTGRESQL_URL }
]

const LIST_PROGRAMMING_LANG_BADGES: BadgeItem[] = [
  { id: 'javascript', name: 'JavaScript', url: JAVASCRIPT_URL },
  { id: 'typescript', name: 'TypeScript', url: TYPESCRIPT_URL },
  { id: 'ruby', name: 'Ruby', url: RUBY_URL },
  { id: 'cpp', name: 'C++', url: CPP_URL },
  { id: 'java', name: 'Java', url: JAVA_URL },
  { id: 'go', name: 'Go', url: GO_URL },
  { id: 'swift', name: 'Swift', url: SWIFT_URL },
  { id: 'rust', name: 'Rust', url: RUST_URL },
  { id: 'c-sharp', name: 'C#', url: C_SHARP_URL },
  { id: 'php', name: 'PHP', url: PHP_URL },
  { id: 'python', name: 'Python', url: PYTHON_URL },
  { id: 'dart', name: 'Dart', url: DART_URL }
]

const LIST_FRONTEND_FRAMEWORKS_BADGES: BadgeItem[] = [
  { id: 'react', name: 'React', url: REACT_URL },
  { id: 'vuejs', name: 'Vue.js', url: VUEJS_URL },
  { id: 'html5', name: 'HTML5', url: HTML5_URL },
  { id: 'css3', name: 'CSS3', url: CSS3_URL },
  { id: 'angular', name: 'Angular', url: ANGULAR_URL },
  { id: 'tailwind-css', name: 'Tailwind CSS', url: TAILWIND_CSS_URL },
  { id: 'astro', name: 'Astro', url: ASTRO_URL },
  { id: 'svelte', name: 'Svelte', url: SVELTE_URL }
]

const LIST_BACKEND_FRAMEWORKDS_BADGES: BadgeItem[] = [
  { id: 'nodejs', name: 'Node.js', url: NODEJS_URL },
  { id: 'spring-boot', name: 'Spring Boot', url: SPRING_BOOT_URL },
  { id: 'ruby-on-rails', name: 'Ruby on Rails', url: RUBY_ON_RAILS_URL },
  { id: 'docker', name: 'Docker', url: DOCKER_URL },
  { id: 'kubernetes', name: 'Kubernetes', url: KUBERNETES_URL },
  { id: 'graphql', name: 'GraphQL', url: GRAPHQL_URL }
]

const LIST_MOBILE_DESKTOP_BADGES: BadgeItem[] = [
  { id: 'swiftui', name: 'SwiftUI', url: SWIFTUI_URL },
  { id: 'android', name: 'Android', url: ANDROID_URL },
  { id: 'flutter', name: 'Flutter', url: FLUTTER_URL },
  { id: 'react-native', name: 'React Native', url: REACT_NATIVE_URL },
  { id: 'tauri', name: 'Tauri', url: TAURI_URL },
  { id: 'electron', name: 'Electron', url: ELECTRON_URL }
]

const LIST_DEPLOYMENT_BADGES: BadgeItem[] = [
  { id: 'vercel', name: 'Vercel', url: VERCEL_URL },
  { id: 'netlify', name: 'Netlify', url: NETLIFY_URL },
  { id: 'heroku', name: 'Heroku', url: HEROKU_URL }
]

export const LIST_BADGES: BadgeOption[] = [
  {
    id: 'prolang',
    label: 'Programming Languages',
    data: LIST_PROGRAMMING_LANG_BADGES
  },
  {
    id: 'frontend',
    label: 'Frontend',
    data: LIST_FRONTEND_FRAMEWORKS_BADGES
  },
  {
    id: 'backend',
    label: 'Backend',
    data: LIST_BACKEND_FRAMEWORKDS_BADGES
  },
  {
    id: 'mobile / desktop',
    label: 'Mobile and Desktop',
    data: LIST_MOBILE_DESKTOP_BADGES
  },
  {
    id: 'github',
    label: 'GitHub',
    data: LIST_GITHUB_BADGES
  },
  {
    id: 'database',
    label: 'Database',
    data: LIST_DB_BADGES
  },
  {
    id: 'cloud',
    label: 'Cloud',
    data: LIST_CLOUD_BADGES
  },
  {
    id: 'deployment',
    label: 'Deployment',
    data: LIST_DEPLOYMENT_BADGES
  }
]
