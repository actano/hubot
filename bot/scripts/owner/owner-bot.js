class OwnerBot {
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
    res.reply(
      'Commands for owners and how to find them.\n\n' +
      'owner start: Hey you already did this. It\'s the beginning of the shared code ownership.\n' +
      'owner description: You want to see this again? Go on then.\n' +
      'owner list: Show the list of owned topics. It\'s growing.\n' +
      'owner add topic: Add a new topic to be owned. It\'s up to you!\n' +
      'owner remove topic: This topic will not be needed anymore. Remove it.\n' +
      'owner add user: You want to own a topic. Put your name here!\n' +
      'owner remove user: Not your topic anymore? This removes you from the duty.\n' +
      'owner get responsible: Who is in the lead right now. I\'ll show it to you right now.\n' +
      'owner set responsible: You want to be the responsible for a topic? ' +
        'Put a name on the topic.\n'
    )
  }

  listOfTopics(res) {
    this.result = 'listOfTopics'
    res.reply(
            'List of owned topics'
        )
  }

  addTopic(res) {
    this.result = 'addTopic'
    res.reply(
            'Add an ownership to a new topic'
        )
  }

  removeTopic(res) {
    this.result = 'removeTopic'
    res.reply(
            'Remove a topic from ownership'
        )
  }

  addOwnerToTopic(res) {
    this.result = 'addOwnerToTopic'
    res.reply(
            'Add owner to a topic'
        )
  }

  removeUserFromTopic(res) {
    this.result = 'removeUserFromTopic'
    res.reply(
            'Remove owner from a topic'
        )
  }

  getResponsibleForTopic(res) {
    this.result = 'getResponsibleForTopic'
    res.reply(
            'Get responsible from a topic'
        )
  }

  setResponsibleForTopic(res) {
    this.result = 'setResponsibleForTopic'
    res.reply(
            'Set responsible from a topic'
        )
  }
}

module.exports = {
  OwnerBot,
}

