const lunchBot = require('./lunch')
const githubEvents = require('./github-event-notifier')

module.exports = (robot) => {
  lunchBot(robot)
  githubEvents(robot)
}
