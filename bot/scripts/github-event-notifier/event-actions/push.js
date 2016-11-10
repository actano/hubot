const messages = require('../messages')
const flatMap = require('lodash/fp/flatMap')

module.exports = (data, callback) => {
  const { commits, ref } = data
  const modifiedFiles = flatMap((commit) => commit.modified, commits)
  const fullName = data.repository.full_name
  let chatMessage

  if (ref === 'refs/heads/master') {
    if (modifiedFiles.indexOf('yarn.lock') !== -1) {
      chatMessage = messages.yarnLock(fullName)
      callback(chatMessage)
    }

    if (modifiedFiles.indexOf('docker-dev/Dockerfile') !== -1) {
      chatMessage = messages.dockerfile(fullName)
      callback(chatMessage)
    }
  }
}
