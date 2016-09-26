const jira = require('./jira')

module.exports = (robot, _jira = jira) => {
  robot.hear(/RX-\d{1,10}/ig, _jira.sendIssueLink)
}
