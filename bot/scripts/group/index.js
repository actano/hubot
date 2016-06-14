const { GroupBot } = require('./group-bot')

module.exports = (robot) => {
  const bot = new GroupBot()
  robot.hear(/group open ([a-z][A-Z]+)/i, (res) => bot.open(res))
  robot.hear(/group join ([a-z][A-Z]+)/i, (res) => bot.join(res))
  robot.hear(/group members ([a-z][A-Z]+)/i, (res) => bot.members(res))
  robot.hear(/group list/i, (res) => bot.list(res))
}
