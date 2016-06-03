const messages = require('./messages')

module.exports = {
  sendIssueLink: (res) => {
    const number = res.match[1]
    res.send(messages.issueLink(number))
  },
}
