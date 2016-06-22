const messages = require('./messages')

module.exports = {
  sendIssueLink: (res) => {
    for (const match of res.match) {
      const issueLink = messages.issueLink(match)
      if (!res.message.text.includes(issueLink)) {
        res.send(issueLink)
      }
    }
  },
}
