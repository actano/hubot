const { LunchBot } = require('./lunch-bot')

module.exports = (robot) => {
  const bot = new LunchBot()
  robot.hear(/lunch start/i, (res) => bot.start(res))
  robot.hear(/lunch result/i, (res) => bot.results(res))
  robot.hear(/lunch ([0-9]+)/i, (res) => bot.vote(res))
}
