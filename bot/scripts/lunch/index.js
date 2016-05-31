const { LunchBot } = require('./lunch-bot')

module.exports = (robot) => {
  const bot = new LunchBot()
  robot.hear(/lunch start/, (res) => bot.start(res))
  robot.hear(/lunch result/, (res) => bot.results(res))
  robot.hear(/lunch ([0-9]+)/, (res) => bot.vote(res))
}
