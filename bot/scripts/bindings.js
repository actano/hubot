const lunchBot = require('./lunch')
const githubEvents = require('./github-event-notifier')
const describe = require('./describe')

module.exports = (robot) => {
  lunchBot(robot)
  githubEvents(robot)
  describe(robot)
}
