<p align="center">
  <a href=https://github.com/xavimondev/easyreadme target="_blank">
    <img src='https://easyreadme.app/banner.avif' width="100%" alt="Banner" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white" alt="Nextjs" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript"  />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-0F172A?logo=tailwind-css&logoColor=38BDF9" alt="TailwindCSS"  />
  <img src="https://img.shields.io/github/stars/xavimondev/easyreadme" alt="GitHub Stars" />
  <img src="https://img.shields.io/github/contributors/xavimondev/easyreadme" alt="GitHub contributors" />
  <img src="https://img.shields.io/github/issues-pr/xavimondev/easyreadme" alt="GitHub pull request" />
  <img src="https://img.shields.io/github/license/xavimondev/easyreadme" alt="GitHub License" />
</p>

<p><p>
<p><p>

## 📌 Overview

Easyreadme is a project that simplifies README creation by generating visually stunning READMEs using pre-designed templates and AI. It supports generating READMEs for JavaScript/TypeScript, Rust, Java, Go, PHP, and Python projects.
It relies on a wide range of technologies and libraries including React, Tailwind CSS, Tiptap, OpenAI, and more.

## 🔍 Table of Contents

- [❤️ Features](#features)

- [💻 Stack](#stack)

- [📝 Project Summary](#project-summary)

- [⚙️ Setting Up](#setting-up)

- [🚀 Run Locally](#run-locally)

- [🗺️ Roadmap](#roadmap)

- [🙏 Acknowledgments](#acknowledgments)

- [📄 License](#license)

## Features

[![introduction]](https://github.com/xavimondev/easyreadme/assets/68721455/c17b1b2e-15ce-494d-a5f6-01cd3a33e7d4)

### List of Templates

[![list-templates]](https://github.com/xavimondev/easyreadme/assets/68721455/db0e33dd-a0d5-49b1-95ad-b2750a381f2c)

### Customize README

[![customize]](https://github.com/xavimondev/easyreadme/assets/68721455/5b023d26-8cef-47ac-80e3-14d9625ff9f5)

### AI sections

[![ai-sections]](https://github.com/xavimondev/easyreadme/assets/68721455/75283477-aaa5-46cd-9bc2-7ba51ef48f59)

### Inline Commands

[![inline-commands]](https://github.com/xavimondev/easyreadme/assets/68721455/dcc523c5-5d1a-4694-be14-845c70c578a1)

### Bubble Menu

[![bubble-menu]](https://github.com/xavimondev/easyreadme/assets/68721455/c57eb746-3e38-403f-b47b-faf6b7155596)

### Editable Banner Image URL

[![editable-banner]](https://github.com/xavimondev/easyreadme/assets/68721455/b3ee71e5-3283-40ea-82d9-01f55e2afac8)

### Free AI Credits, Custom API Key, Local Run

[![credits]](https://github.com/xavimondev/easyreadme/assets/68721455/ce5a4bda-34fc-4464-a898-8449c04d2902)

## Stack

- [next](https://nextjs.org/): A framework for building server-rendered React applications.
- [react](https://reactjs.org/): A JavaScript library for building user interfaces.
- [typescript](https://www.typescriptlang.org/): A typed superset of JavaScript that compiles to plain JavaScript.
- [shadcn/ui](https://ui.shadcn.com/): Provides beautifully designed components for UI.
- [tailwindcss](https://tailwindcss.com/): A utility-first CSS framework for rapid UI development.
- [vaul](https://github.com/emilkowalski/vaul): An unstyled drawer component for React.
- [sonner](https://github.com/emilkowalski/sonner): An opinionated toast component for React.
- [tiptap/core](https://github.com/ueberdosis/tiptap): A highly customizable and extendable rich text editor framework.
- [swr](https://github.com/vercel/swr): Handles data fetching, caching, and synchronization with the server.
- [zustand](https://github.com/pmndrs/zustand): A small, fast, and scalable state management library.
- [lucide](https://lucide.dev/): Beautiful & consistent icons.

## Project Summary

- [**src**](src): Primary source code directory.
- [**src/app**](src/app): Contains the main application logic and components.
- [**src/components**](src/components): Houses reusable UI components.
- [**src/hooks**](src/hooks): Custom React hooks for managing state and side effects.
- [**src/lib**](src/lib): Utility functions and helper modules.
- [**src/services**](src/services): Modules for interacting with external APIs.
- [**src/styles**](src/styles): Global styles and CSS modules.
- [**src/types**](src/types): TypeScript type definitions.
- [**src/utils**](src/utils): Miscellaneous utility functions.
- [**public**](public): Public directory for static assets and build output.

## Setting Up

#### OPENAI_API_KEY

- Go to the [OpenAI website](https://openai.com/).
- Sign in to your account or create a new one.
- Navigate to your [API settings](https://platform.openai.com/account/api-keys).
- Generate an Secret key.
- Copy the generated Secret key.

#### GITHUB_ACCESS_TOKEN

- Go to the GitHub website.
- Sign in to your account or create a new one.
- Navigate to your account settings.
- Go to the "Developer settings" section.
- Generate a new personal access token with the necessary permissions.

#### KV_REST_API_URL and KV_REST_API_TOKEN

- Go to the [Vercel website](https://vercel.com/).
- Sign in to your account or create a new one.
- Navigate to Storage section.
- Create a new KV Database.
- Copy the KV_REST_API_URL and KV_REST_API_TOKEN from under the **.env.local** tab.

## Run Locally

1.Clone the easyreadme repository:

```sh
git clone https://github.com/xavimondev/easyreadme
```

2.Rename the `.env.example` to `.env`:

```bash
mv .example.env .env
```

3.Install dependencies:

```bash
# bun
bun install
# pnpm
pnpm install
# npm
npm install
# yarn
yarn install
```

6.Start the development mode:

```bash
# bun
bun dev
# pnpm
pnpm dev
# npm
npm run dev
# yarn
yarn dev
```

> [!IMPORTANT]
> 
> Despite having a template for NPM Packages, there's still much work to be done and research on how to get the correct types from packages.

## Roadmap

- [ ] **Add support for more programming languages.**
- [ ] **Add "with emojis" option.**

## Acknowledgments

- The confetti around the "Copy Code" button was created using the [Lucide web](https://github.com/lucide-icons/lucide/blob/main/docs/.vitepress/theme/components/icons/confetti.css) as a reference.

## License

This project is licensed under the **MIT License** - see the [**MIT License**](https://github.com/xavimondev/easyreadme/blob/main/LICENSE) file for details.
