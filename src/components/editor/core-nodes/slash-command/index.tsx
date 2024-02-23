import { groupAlertItems, groupBasicItems } from './blocks'
import { Command, renderItems } from './extension'

const SlashCommand = Command.configure({
  suggestion: {
    items: () => groupAlertItems.concat(groupBasicItems),
    render: renderItems
  }
})

export default SlashCommand
