export const getSetupCommands = ({ commands }: { commands: string[] }) => {
  let setup = ''
  const commandsLength = commands.length - 1
  commands.forEach((command, index) => {
    const addTrailingSpace = index !== commandsLength
    setup += `\n\n${command}`.trim() + `${addTrailingSpace ? '\n\n' : ''}`
  })

  return setup
}
