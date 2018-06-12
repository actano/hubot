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
      expect(res.reply).to.have.been.calledWith()
    })
  })

  describe('listOfTopics', () => {
    it('should show listOfTopics', () => {
      bot.listOfTopics(res)
      expect(bot.result).to.eql('listOfTopics')
      expect(res.reply).to.have.been.calledWith()
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

  describe('removeUserFromTopic', () => {
    it('should show removeUserFromTopic', () => {
      bot.removeUserFromTopic(res)
      expect(bot.result).to.eql('removeUserFromTopic')
      expect(res.reply).to.have.been.calledWith()
    })
  })

  describe('getResponsibleForTopic', () => {
    it('should show getResponsibleForTopic', () => {
      bot.getResponsibleForTopic(res)
      expect(bot.result).to.eql('getResponsibleForTopic')
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

