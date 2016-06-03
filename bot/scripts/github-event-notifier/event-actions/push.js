module.exports = (data, callback) => {
  const { head_commit } = data
  const repo = data.repository
  const { pusher } = data
  let chatNotification = `New Commit \"${head_commit.message}\" to ${repo.full_name}
    by ${pusher.name}: ${head_commit.url}`

  if (!data.deleted) {
    if (head_commit.message.indexOf('npm-shrinkwrap.json') !== -1) {
      chatNotification = `${chatNotification} \n\n*Folks please call npm prune and npm install!*`
    }
    return callback(chatNotification)
  }
  return undefined
}
