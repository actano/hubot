module.exports = (robot) => {
  robot.respond(/describe/i, (res) => {
    res.send(`node version: ${process.version}`)
  })
}
