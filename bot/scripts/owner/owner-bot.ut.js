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

  describe('listOfTopics', () => {
    it('should show listOfTopics', () => {
      bot.listOfTopics(res)
      expect(bot.result).to.eql('listOfTopics')
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

  describe('addOwnerToTopic', () => {
    it('should show addOwnerToTopic', () => {
      bot.addOwnerToTopic(res)
      expect(bot.result).to.eql('addOwnerToTopic')
      expect(res.reply).to.have.been.calledWith()
    })
  })

  describe('getOwnersOfTopic', () => {
    it('should show getOwnersOfTopic', () => {
      bot.getOwnersOfTopic(res)
      expect(bot.result).to.eql('getOwnersOfTopic')
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

  describe('getResponsibleOfTopic', () => {
    it('should show getResponsibleOfTopic', () => {
      bot.getResponsibleOfTopic(res)
      expect(bot.result).to.eql('getResponsibleOfTopic')
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
})

