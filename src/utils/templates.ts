export const getTemplate = (template: string) => {
  if (template === 'Minimal') return getMinimal()
  else return '# Another template'
}

const getMinimal = () => {
  return `<p style="text-align:center;">
  <a href="https://boostgrammar-io.pages.dev/" target="_blank">
    <img src="https://boostgrammar-io.pages.dev/ogimage.jpeg" width="100%" alt="Banner" />
  </a>
</p>

# {{project_name}}

{{project_description}}

# Stack

{{project_stack}}
- **Client Framework**: Astro + Preact
- **Server Framework**: [Fastify](https://www.fastify.io/)

# Setting up

## Supabase - API Keys

1. Sign In on Supabase.
2. Go to settings option on sidebar.
3. Select API option on project settings block.
4. Copy **anon public** and **URL**.


# Resources

1. [Loaders](https://codepen.io/Aisha-Rashed/pen/YzPEZJY).
{{project_resources}}

# Run locally

1. Clone this repo to a directory and then run \`npm install\`.
2. Set-up your environment variables for the client by renaming \`.env.example\` to \`.env\` and following **Supabase - Project API Keys**.
3. Set-up your environment variables for the server by renaming \`api/.env.example\` to \`.env\` and following **RapidAPI - API Keys** and **Cohere.ai - API Keys**.
4. Run \`npm run dev\` to start developing mode.`
}
