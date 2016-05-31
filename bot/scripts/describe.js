module.exports = (robot) => {

  robot.respond('describe', (res) => {
    res.reply(`node version: ${process.version}`)
  })

};