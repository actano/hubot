const { GroupBot } = require('./group-bot')

module.exports = (robot) => {
  const bot = new GroupBot()
  robot.hear(/gang up ([a-z][A-Z]+)/i, (res) => bot.open(res))
  robot.hear(/gang join ([a-z][A-Z]+)/i, (res) => bot.join(res))
  robot.hear(/gang members ([a-z][A-Z]+)/i, (res) => bot.members(res))
  robot.hear(/gang list/i, (res) => bot.list(res))
  robot.hear(/gang notify ([a-z][A-Z]+) (.+)/i, (res) => bot.notify(res))
}
