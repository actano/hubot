/* eslint-env mocha */

const sinon = require('sinon')
const { LunchBot } = require('./lunch-bot')

describe('lunch-bot', () => {
  const sandbox = sinon.sandbox.create()

  const res = {
    send: sandbox.stub(),
    reply: sandbox.stub(),
  }

  afterEach('stub', () => {
    sandbox.reset()
  })

  let bot

  beforeEach('lunch bot', () => {
    bot = new LunchBot()
  })

  it('should start a lunch poll', () => {
    bot.start(res)
  })
})

