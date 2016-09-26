/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

const sinon = require('sinon')
const chai = require('chai')

const expect = chai.expect
chai.use(require('sinon-chai'))
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
      expect(res.send).to.have.been.calledWith(`0: ${LunchChoice[0]}`)
    })
  })

  describe('vote', () => {
    it('should store a vote', () => {
      res.match[1] = 0
      bot.vote(res)
      expect(bot.result[0]).to.eql(['john'])
      expect(res.reply).to.be.have.been.called
    })
  })
})

