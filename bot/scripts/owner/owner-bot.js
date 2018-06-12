class OwnerBot {
  constructor() {
    this.topics = []
  }

  start(res) {
    this.result = 'start'
    res.send(
        'Find the owner!\n' +
        'All about shared code ownership.\n' +
        'If you have a question about a topic reach out for the owners.\n' +
        'Ask the actual responsible of the topic, if you need more information.\n' +
        'How to works: "owner description"'
    )
  }

  description(res) {
    this.result = 'description'
    res.send(
      'Commands for owners and how to find them.\n\n' +
      'owner start: Hey you already did this. It\'s the beginning of the shared code ownership.\n' +
      'owner description: You want to see this again? Go on then.\n' +
      'owner list: Show the list of owned topics. It\'s growing.\n' +
      'owner add topic: Add a new topic to be owned. It\'s up to you!\n' +
      'owner remove topic: This topic will not be needed anymore. Remove it.\n' +
      'owner add owner: You want to own a topic. Put your name here!\n' +
      'owner remove owner: Not your topic anymore? This removes you from the duty.\n' +
      'owner get owners: Who are the owners. I\'ll show it to you right now.\n' +
      'owner set responsible: You want to be the responsible for a topic? ' +
        'Put a name on the topic.\n' +
      'owner get responsible: Who is in the lead right now. I\'ll show it to you right now.\n'
    )
  }

  listOfTopics(res) {
    this.result = 'listOfTopics'
    let message = 'List of owned topics:\n'
    if (this.topics.length === 0) {
      res.send('No topic has a shared code ownership yet. Come one take one over now!')
      return
    }
    this.topics.forEach(topic => {
      message = message.concat(`${topic.name} -> `)

      const responsible = topic.responsible
      if (responsible != null) {
        message = message.concat(`Responsible: ${topic.responsible} -> `)
      } else {
        message = message.concat('No Responsible -> ')
      }

      const owners = topic.owners
      message = message.concat('Owners: ')
      if (owners.length !== 0) {
        owners.forEach(owner => {
          message = message.concat(`${owner},`)
        })
      } else {
        message = message.concat('none ')
      }
      message = message.concat('\n')
    })
    res.send(message)
  }

  addTopic(res) {
    this.result = 'addTopic'
    const topicName = res.match[1]
    if (this.topics.find(topic => topic.name === topicName)) {
      res.reply('This Topic is already specified.')
      return
    }

    const topic = {
      name: topicName,
      owners: [],
      responsible: null,
    }

    this.topics.push(topic)
    res.reply(`Topic \`${topicName}\` is added. Now add owners`)
  }

  removeTopic(res) {
    const topic = res.match[1]
    this.topics.pop(topic)
    this.result = 'removeTopic'
    res.reply(`Topic \`${topic}\` is removed.`)
  }

  addOwnerToTopic(res) {
    this.result = 'addOwnerToTopic'
    const topicName = res.match[1]
    const ownerForTopic = res.match[2]
    const topicIdx = this.topics.findIndex(topic => topic.name === topicName)
    if (topicIdx !== -1) {
      if (this.topics[topicIdx].owners.indexOf(ownerForTopic) === -1) {
        this.topics[topicIdx].owners.push(ownerForTopic)
        res.reply(`Owner ${ownerForTopic} for topic \`${topicName}\` added.`)
      } else {
        res.reply('No owner specified. ')
      }
    } else {
      res.reply('This is a new topic for me. Add it first! ')
    }
  }

  removeOwnerFromTopic(res) {
    this.result = 'removeOwnerFromTopic'
    const topicName = res.match[1]
    const ownerForTopic = res.match[2]
    const topicIdx = this.topics.findIndex(topic => topic.name === topicName)
    if (topicIdx !== -1) {
      const ownerIdx = this.topics[topicIdx].owners.indexOf(ownerForTopic)
      if (ownerIdx !== -1) {
        this.topics[topicIdx].owners.pop(ownerForTopic)
        res.reply(`Owner ${ownerForTopic} for topic ${topicName} removed.`)
      } else {
        res.reply(`${ownerForTopic} is no owner for ${topicName}. `)
      }
    } else {
      res.reply('This is a new topic for me. Add it first! ')
    }
  }

  getOwnersOfTopic(res) {
    this.result = 'getOwnersOfTopic'
    const topicName = res.match[1]
    const topicIdx = this.topics.findIndex(topic => topic.name === topicName)
    if (topicIdx !== -1) {
      res.reply(`Owners for topic \`${topicName}\` are ${this.topics[topicIdx].owners} .`)
    } else {
      res.reply('This is a new topic for me. Add it first! ')
    }
  }

  setResponsibleForTopic(res) {
    this.result = 'setResponsibleForTopic'
    const topicName = res.match[1]
    const responsibleForTopic = res.match[2]
    const topicIdx = this.topics.findIndex(topic => topic.name === topicName)
    if (topicIdx !== -1) {
      if (responsibleForTopic !== undefined) {
        this.topics[topicIdx].responsible = responsibleForTopic
        res.reply(`Responsible ${responsibleForTopic} for topic \`${topicName}\` set.`)
      } else {
        res.reply('No responsible specified. ')
      }
    } else {
      res.reply('This is a new topic for me. Add it first! ')
    }
  }

  getResponsibleOfTopic(res) {
    this.result = 'getResponsibleOfTopic'
    const topicName = res.match[1]
    const topicIdx = this.topics.findIndex(topic => topic.name === topicName)
    if (topicIdx !== -1) {
      res.reply(`Responsible for topic \`${topicName}\` is ${this.topics[topicIdx].responsible}.`)
    } else {
      res.reply('This is a new topic for me. Add it first! ')
    }
  }
}

module.exports = {
  OwnerBot,
}

