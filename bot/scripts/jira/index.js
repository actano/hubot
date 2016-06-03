const jira = require('./jira.js')

module.exports = (robot) => {
  robot.hear(/RX-(\d{1,10})/i, jira.sendIssueLink)
}
