<p align="center">
  <a href=https://github.com/xavimondev/easyreadme target="_blank">
    <img src='https://easyreadme.vercel.app/banner.jpg' width="100%" alt="Banner" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/contributors/xavimondev/easyreadme" alt="GitHub contributors" />
  <img src="https://img.shields.io/github/stars/xavimondev/easyreadme" alt="GitHub Stars" />
  <img src="https://img.shields.io/github/issues/xavimondev/easyreadme" alt="GitHub issues" />
  <img src="https://img.shields.io/github/issues-pr/xavimondev/easyreadme" alt="GitHub pull request" />
  <img src="https://img.shields.io/github/license/xavimondev/easyreadme" alt="GitHub License" />
</p>

<p><p>
<p><p>

## 📌 Overview

Easyreadme is a project that simplifies README creation by generating visually stunning READMEs using pre-designed templates and AI. It supports generating READMEs for JavaScript/TypeScript, Rust, Java, Go, PHP, and Python projects.
It relies on a wide range of technologies and libraries including React, Tailwind CSS, Tiptap, OpenAI, and more.

## 🔍 Table of Contents

- [💻 Stack](#stack)

- [📝 Project Summary](#project-summary)

- [⚙️ Setting Up](#setting-up)

- [🚀 Run Locally](#run-locally)

- [📄 License](#license)

## 💻 Stack

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
- [phosphoricons](https://phosphoricons.com/): A flexible icon family for interfaces, diagrams, presentations

## 📝 Project Summary

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

## ⚙️ Setting Up

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

## 🚀 Run Locally

1.Clone the easyreadme repository:

```sh
git clone https://github.com/xavimondev/easyreadme
```

2.Install dependencies:

```bash
pnpm install

bun install

npm install

yarn install

```

3.Start the development mode:

```bash
pnpm dev

bun dev

npm run dev

yarn dev
```

## 🗺️ Roadmap

- [ ] **Let users create their own templates.**
- [ ] **Extend support for monorepos and libraries.**

## 📄 License

This project is licensed under the **MIT License** - see the [**MIT License**](https://github.com/xavimondev/easyreadme/blob/main/LICENSE) file for details.
