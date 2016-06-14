const { LocalDate } = require('js-joda')
const RESET_INTERVAL = 60000

function today() {
  return LocalDate.now().dayOfMonth()
}

class GroupBot {
  constructor() {
    this.groups = {}
    this._resetOnNewDay(today())
  }

  _resetOnNewDay(lastDay) {
    const currentDay = today()
    if (lastDay < currentDay) {
      this.groups = {}
    }
    setTimeout(() => {
      this._resetOnNewDay(currentDay)
    }, RESET_INTERVAL)
  }

  _sendGroupMembers(res, groupName) {
    const group = this.groups[groupName]
    res.send(`${groupName}: ${group.members.join(', ')}`)
  }

  open(res) {
    const userName = res.message.user.name
    const groupName = res.match[1]
    this.groups[groupName] = { members: [userName] }
    res.send(`${userName} opened group ${groupName}`)
  }

  join(res) {
    const userName = res.message.user.name
    const groupName = res.match[1]
    const group = this.groups[groupName]
    if (!group) {
      res.reply(`group ${groupName} does not exist`)
    } else {
      if (group.members.indexOf(userName) === -1) {
        group.members.push(userName)
        res.send(`${userName} joined ${groupName}`)
      }
    }
  }

  members(res) {
    const groupName = res.match[1]
    const group = this.groups[groupName]
    if (!group) {
      res.reply(`group ${groupName} does not exist`)
    } else {
      this._sendGroupMembers(res, groupName)
    }
  }

  list(res) {
    const groupNames = Object.keys(this.groups)
    if (groupNames.length === 0) {
      res.send('no groups to list')
    } else {
      groupNames.forEach((groupName) => {
        this._sendGroupMembers(res, groupName)
      })
    }
  }
}

module.exports = {
  GroupBot,
  RESET_INTERVAL,
}
