const lunchBot = require('./lunch')
const githubEvents = require('./github-event-notifier')
const describe = require('./describe')
const jira = require('./jira')
const group = require('./group')
const owner = require('./owner')

module.exports = (robot) => {
  lunchBot(robot)
  jira(robot)
  githubEvents(robot)
  describe(robot)
  group(robot)
  owner(robot)
}
