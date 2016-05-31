module.exports = (robot) => {

  robot.respond('describe', (res) => {
    res.send(`node version: ${process.version}`)
  })

};
