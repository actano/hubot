const { OwnerBot } = require('./owner-bot')

module.exports = (robot) => {
  const bot = new OwnerBot()
  robot.hear(/owner start/i, (res) => bot.start(res))
  robot.hear(/owner description/i, (res) => bot.description(res))
  robot.hear(/owner topics/i, (res) => bot.topicsList(res))
  robot.hear(/owner add topic ([a-z][A-Z]+)/i, (res) => bot.addTopic(res))
  robot.hear(/owner remove topic ([a-z][A-Z]+)/i, (res) => bot.removeTopic(res))
  robot.hear(/owner add owner ([a-z][A-Z]+) (.+)/i, (res) => bot.addOwnerToTopic(res))
  robot.hear(/owner remove owner ([a-z][A-Z]+) (.+)/i, (res) => bot.removeOwnerFromTopic(res))
  robot.hear(/owner owners ([a-z][A-Z]+)/i, (res) => bot.ownersOfTopic(res))
  robot.hear(/owner set responsible ([a-z][A-Z]+) (.+)/i, (res) => bot.setResponsibleForTopic(res))
  robot.hear(/owner responsible ([a-z][A-Z]+)/i, (res) => bot.responsibleOfTopic(res))
}
