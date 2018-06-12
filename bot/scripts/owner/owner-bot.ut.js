/* eslint-env mocha */

const sinon = require('sinon')
const chai = require('chai')

const expect = chai.expect
chai.use(require('sinon-chai'))
const { OwnerBot } = require('./owner-bot')

describe('owner-bot', () => {
  let res
  let bot

  beforeEach('owner bot', () => {
    bot = new OwnerBot()
    res = {
      send: sinon.stub(),
      reply: sinon.stub(),
      match: { },
    }
  })

  describe('start', () => {
    it('should start a code ownership', () => {
      bot.start(res)
      expect(bot.result).to.eql('start')
      expect(res.send).to.have.been.calledWith()
    })
  })

  describe('description', () => {
    it('should show description', () => {
      bot.description(res)
      expect(bot.result).to.eql('description')
      expect(res.send).to.have.been.calledWith()
    })
  })

  describe('addTopic', () => {
    it('should show addTopic', () => {
      bot.addTopic(res)
      expect(bot.result).to.eql('addTopic')
      expect(res.reply).to.have.been.calledWith()
    })
  })

  describe('topicsList', () => {
    it('should show list of topics', () => {
      bot.topicsList(res)
      expect(bot.result).to.eql('topicsList')
      expect(res.send).to.have.been.calledWith()
    })
  })

  describe('addOwnerToTopic', () => {
    it('should show addOwnerToTopic', () => {
      bot.addOwnerToTopic(res)
      expect(bot.result).to.eql('addOwnerToTopic')
      expect(res.reply).to.have.been.calledWith()
    })
  })

  describe('removeOwnerFromTopic', () => {
    it('should show removeOwnerFromTopic', () => {
      bot.removeOwnerFromTopic(res)
      expect(bot.result).to.eql('removeOwnerFromTopic')
      expect(res.reply).to.have.been.calledWith()
    })
  })

  describe('ownersOfTopic', () => {
    it('should show ownersOfTopic', () => {
      bot.ownersOfTopic(res)
      expect(bot.result).to.eql('ownersOfTopic')
      expect(res.reply).to.have.been.calledWith()
    })
  })

  describe('setResponsibleForTopic', () => {
    it('should show setResponsibleForTopic', () => {
      bot.setResponsibleForTopic(res)
      expect(bot.result).to.eql('setResponsibleForTopic')
      expect(res.reply).to.have.been.calledWith()
    })
  })

  describe('responsibleOfTopic', () => {
    it('should show responsibleOfTopic', () => {
      bot.responsibleOfTopic(res)
      expect(bot.result).to.eql('responsibleOfTopic')
      expect(res.reply).to.have.been.calledWith()
    })
  })
})

