const messages = require('../messages')
const flatMap = require('lodash/fp/flatMap')

module.exports = (data, callback) => {
  const { commits, ref } = data
  const modifiedFiles = flatMap((commit) => commit.modified, commits)
  const fullName = data.repository.full_name
  let chatMessage

  if (ref === 'refs/heads/master') {
    if (modifiedFiles.indexOf('npm-shrinkwrap.json') !== -1) {
      chatMessage = messages.shrinkwrap(fullName)
    } else if (modifiedFiles.indexOf('Dockerfile.dev') !== -1) {
      chatMessage = messages.dockerfile(fullName)
    }
  }

  if (chatMessage) {
    callback(chatMessage)
  }
}
