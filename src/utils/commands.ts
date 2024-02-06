export const getSetupCommands = ({ commands }: { commands: string[] }) => {
  let setup = ''

  commands.forEach((command) => {
    setup += `\n\n${command}`.trim() + `\n\n`
  })

  return setup
}
