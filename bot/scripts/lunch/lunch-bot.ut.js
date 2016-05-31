/* eslint-env mocha */

const sinon = require('sinon')
const { expect } = require('chai')
const { LunchBot, LunchChoice } = require('./lunch-bot')

describe('lunch-bot', () => {
  let res
  let bot

  beforeEach('lunch bot', () => {
    bot = new LunchBot()
    res = {
      send: sinon.stub(),
      reply: sinon.stub(),
      message: {
        user: {
          name: 'john',
        },
      },
      match: { },
    }
  })

  describe('start', () => {
    it('should start a lunch poll', () => {
      bot.start(res)
      expect(bot.result[0]).to.eql([])
      expect(res.send.calledWith(`0: ${LunchChoice[0]}`)).to.be.true
    })
  })

  describe('vote', () => {
    it('should store a vote', () => {
      res.match[1] = 0
      bot.vote(res)
      expect(bot.result[0]).to.eql(['john'])
      expect(res.reply.called).to.be.true
    })
  })
})

