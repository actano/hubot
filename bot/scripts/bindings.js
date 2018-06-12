const lunchBot = require('./lunch')
const githubEvents = require('./github-event-notifier')
const describe = require('./describe')
const jira = require('./jira')
const group = require('./group')
const ownerBot = require('./owner')

module.exports = (robot) => {
  lunchBot(robot)
  ownerBot(robot)
  jira(robot)
  githubEvents(robot)
  describe(robot)
  group(robot)
}
