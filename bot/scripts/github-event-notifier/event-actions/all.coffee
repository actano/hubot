module.exports =
  push: (data, callback) ->
    commit = data.after
    commits = data.commits
    head_commit = data.head_commit
    repo = data.repository
    pusher = data.pusher
    chat_notification = "New Commit \"#{head_commit.message}\" to #{repo.full_name} by #{pusher.name}: #{head_commit.url}"

    if !data.deleted
      if head_commit.message.indexOf("npm-shrinkwrap.json") isnt -1
        chat_notification = chat_notification + "\n\n*Folks please call npm prune and npm install!*"
      callback chat_notification
