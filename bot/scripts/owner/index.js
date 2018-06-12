const { OwnerBot } = require('./owner-bot')

module.exports = (robot) => {
  const bot = new OwnerBot()
  robot.hear(/owner start/i, (res) => bot.start(res))
  robot.hear(/owner description/i, (res) => bot.description(res))
  robot.hear(/owner list/i, (res) => bot.listOfTopics(res))
  robot.hear(/owner add topic ([a-z][A-Z]+)/i, (res) => bot.addTopic(res))
  robot.hear(/owner remove topic ([a-z][A-Z]+)/i, (res) => bot.removeTopic(res))
  robot.hear(/owner add user/i, (res) => bot.addOwnerToTopic(res))
  robot.hear(/owner remove user/i, (res) => bot.removeUserFromTopic(res))
  robot.hear(/owner set responsible/i, (res) => bot.setResponsibleForTopic(res))
  robot.hear(/owner get responsible/i, (res) => bot.getResponsibleForTopic(res))
}
