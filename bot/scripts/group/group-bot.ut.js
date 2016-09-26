/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

const sinon = require('sinon')
const chai = require('chai')

const expect = chai.expect
chai.use(require('sinon-chai'))
const { GroupBot, RESET_INTERVAL } = require('./group-bot')

const { LocalDate } = require('js-joda')

describe('group-bot', () => {
  let res
  let bot
  let resetOnNewDayStub

  const sandbox = sinon.sandbox.create()

  beforeEach(() => {
    resetOnNewDayStub = sandbox.stub(GroupBot.prototype, '_resetOnNewDay')
    bot = new GroupBot()
    res = {
      send: sandbox.stub(),
      reply: sandbox.stub(),
      message: {
        user: {
          name: 'john',
        },
      },
      match: { 1: 'italy' },
    }
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('open', () => {
    it('should add a group when no group exists', () => {
      bot.open(res)
      expect(res.send).to.have.been.calledWith('john opened group italy')
    })

    it('should add the user that opened the group as a member', () => {
      bot.open(res)
      expect(bot.groups.italy).to.eql({ members: ['john'] })
    })

    it('should replace a group when a group already exists', () => {
      bot.groups.italy = {}
      bot.open(res)
      expect(bot.groups.italy).to.eql({ members: ['john'] })
    })
  })

  describe('join', () => {
    it('should respond with a warning when group does not exist', () => {
      bot.join(res)
      expect(res.reply).to.have.been.calledWith('group italy does not exist')
    })

    it('should join a group when the group does exist', () => {
      bot.groups.italy = { members: [] }
      bot.join(res)
      expect(bot.groups.italy.members).to.eql(['john'])
      expect(res.send).to.have.been.calledWith('john joined italy')
    })

    it('should not join a group again when already joined a group', () => {
      bot.groups.italy = { members: ['john'] }
      bot.join(res)
      expect(bot.groups.italy.members).to.eql(['john'])
      expect(res.send).to.not.have.been.called
    })
  })

  describe('members', () => {
    let sendGroupMembersStub

    beforeEach(() => {
      sendGroupMembersStub = sandbox.stub(bot, '_sendGroupMembers')
    })

    it('should respond with a warning when group does not exist', () => {
      bot.members(res)
      expect(res.reply).to.have.been.calledWith('group italy does not exist')
    })

    it('should list members when group exists', () => {
      bot.groups.italy = { members: ['john', 'snow'] }
      bot.members(res)
      expect(sendGroupMembersStub).to.have.been.calledWith(res, 'italy')
    })
  })

  describe('list', () => {
    let sendGroupMembersStub = null

    beforeEach(() => {
      sendGroupMembersStub = sandbox.stub(bot, '_sendGroupMembers')
    })

    it('should display message when no groups exist', () => {
      bot.list(res)
      expect(res.send).to.have.been.calledWith('no groups to list')
    })

    it('should list existing groups with members', () => {
      bot.groups.italy = { members: ['john', 'snow'] }
      bot.groups.saigon = { members: ['darth', 'vader'] }
      bot.list(res)
      expect(sendGroupMembersStub).to.have.been.calledWith(res, 'italy')
      expect(sendGroupMembersStub).to.have.been.calledWith(res, 'saigon')
    })
  })

  describe('_sendGroupMembers', () => {
    it('should send group by name', () => {
      bot.groups.italy = { members: ['john', 'snow'] }
      bot._sendGroupMembers(res, 'italy')
      expect(res.send).to.have.been.calledWith('italy: john, snow')
    })
  })

  describe('_sendWithMentions', () => {
    it('should send with group members as mentions', () => {
      bot.groups.italy = { members: ['john', 'snow'] }
      bot._sendWithMentions(res, 'italy', 'john', 'some text')
      expect(res.send).to.have.been.calledWith('@snow some text')
    })

    it('should send without mentions wit no group members', () => {
      bot.groups.italy = { members: ['john'] }
      bot._sendWithMentions(res, 'italy', 'john', 'some text')
      expect(res.send).to.have.been.calledWith('some text')
    })
  })

  describe('_resetEveryDay', () => {
    let clock
    let today
    let tomorrow

    const ONE_DAY_AS_MILLIS = 60 * 60 * 24 * 1000

    beforeEach(() => {
      resetOnNewDayStub.restore()
      clock = sandbox.useFakeTimers()
      today = LocalDate.now().dayOfMonth()
      tomorrow = today + 1
    })

    it('should reset groups on day change', () => {
      bot.groups.italy = { }
      bot._resetOnNewDay(today)
      expect(bot.groups.italy).to.exist
    })

    it('should NOT reset groups on no day change', () => {
      bot.groups.italy = { }
      clock.tick(ONE_DAY_AS_MILLIS)
      bot._resetOnNewDay(today)
      expect(bot.groups.italy).to.not.exist
    })

    it('should call itself when reset interval has passed', () => {
      bot._resetOnNewDay(today)
      const recursionStub = sandbox.stub(bot, '_resetOnNewDay')
      clock.tick(RESET_INTERVAL)
      expect(recursionStub).to.be.calledWith(today)
    })

    it('should call itself with new day on day change', () => {
      clock.tick(ONE_DAY_AS_MILLIS + 1)
      bot._resetOnNewDay(today)
      const recursionStub = sandbox.stub(bot, '_resetOnNewDay')
      clock.tick(RESET_INTERVAL)
      expect(recursionStub).to.be.calledWith(tomorrow)
    })
  })
})
