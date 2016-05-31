const choices = {
  0: 'Not hungry',
  1: 'Saigon',
  2: 'Italian',
  3: 'Austrian',
  4: 'Burger',
  5: 'Falafel',
  6: 'Korean',
  7: 'Steak',
}

class LunchBot {
  constructor() {
    this.result = this.freshResult()
  }

  freshResult() {
    const result = {}
    Object.keys(choices).forEach((index) => {
      result[index] = []
    })
    return result
  }

  start(res) {
    this.result = this.freshResult()

    res.send('Where to go for lunch today? ')
    res.send('Make your choice e.g. "lunch 1"')

    Object.keys(choices).forEach((index) => {
      res.send(`${index}: ${choices[index]}`)
    })
  }

  results(res) {
    const result = this.result
    Object.keys(choices).forEach((index) => {
      const members = result[index]
      if (members.length !== 0) {
        res.send(`${choices[index]}: ${members.length} (${members.join(', ')})`)
      }
    })
  }

  vote(res) {
    const userName = res.message.user.name
    const index = res.match[1]
    const currentUsers = this.result[index]
    if (!currentUsers) {
      res.reply('You voted for a non-existent choice')
    } else if (currentUsers.indexOf(userName) === -1) {
      currentUsers.push(userName)
      res.reply(`You voted for ${choices[index]}`)
    } else {
      res.reply(`You have already voted for ${choices[index]}`)
    }
  }

}

module.exports = {
  LunchBot,
}

