const messages = require('../messages')
const flatMap = require('lodash/fp/flatMap')

module.exports = (data, callback) => {
  const { commits, ref } = data
  const modifiedFiles = flatMap((commit) => commit.modified, commits)

  if (ref === 'refs/heads/master' && modifiedFiles.indexOf('npm-shrinkwrap.json') !== -1) {
    const fullName = data.repository.full_name
    const chatMessage = messages.shrinkwrap(fullName)
    callback(chatMessage)
  }
}
