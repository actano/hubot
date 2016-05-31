let push = function(data, callback) {
  let commit = data.after;
  let { commits } = data;
  let { head_commit } = data;
  let repo = data.repository;
  let { pusher } = data;
  let chat_notification = `New Commit \"${head_commit.message}\" to ${repo.full_name} by ${pusher.name}: ${head_commit.url}`;

  if (!data.deleted) {
    if (head_commit.message.indexOf("npm-shrinkwrap.json") !== -1) {
      chat_notification = chat_notification + "\n\n*Folks please call npm prune and npm install!*";
    }
    return callback(chat_notification);
  }
};

export { push };
