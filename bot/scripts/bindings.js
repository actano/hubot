const lunchBot = require('./lunch')
const githubEvents = require('./github-event-notifier')
const describe = require('./describe')
const jira = require('./jira')

module.exports = (robot) => {
  lunchBot(robot)
  jira(robot)
  githubEvents(robot)
  describe(robot)
}
