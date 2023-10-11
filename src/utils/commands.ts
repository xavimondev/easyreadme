export const getSetupCommands = ({ commands }: { commands: string[] }) => {
  let setup = `\`\`\`bash\n`

  commands.forEach((command, index) => {
    const breakLine = index === commands.length - 1 ? `\n` : `\n\n`
    setup += `\n${command}`.trim() + `${breakLine}`
  })
  setup += `\`\`\``
  return setup
}
