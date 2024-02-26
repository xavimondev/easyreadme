import { groupAlertItems, groupBasicItems } from './blocks'
import { Command, renderItems } from './command'

const CustomSlashCommand = Command.configure({
  suggestion: {
    items: () => groupAlertItems.concat(groupBasicItems),
    render: renderItems
  }
})

export default CustomSlashCommand
