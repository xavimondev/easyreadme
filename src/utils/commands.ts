export const getSetupCommands = ({ commands }: { commands: string[] }) => {
  let setup = `\`\`\`bash\n`

  commands.forEach((command) => {
    setup += `\n${command}`.trim() + `\n\n`
  })
  setup += `\`\`\``
  return setup
}
