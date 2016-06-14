const messages = require('./messages')

module.exports = {
  sendIssueLink: (res) => {
    for (const match of res.match) {
      res.send(messages.issueLink(match))
    }
  },
}
