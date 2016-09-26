/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

const sinon = require('sinon')
const chai = require('chai')

const expect = chai.expect
chai.use(require('sinon-chai'))

const { sendIssueLink } = require('./jira')
const messages = require('./messages')
const hubotScript = require('./index')

describe('jira', () => {
  let res

  beforeEach(() => {
    res = {
      send: sinon.stub(),
      match: [],
      message: {
        text: '',
      },
    }
  })

  describe('sendIssueLink', () => {
    it('should send issue link', () => {
      res.match = ['RX-1234', 'RX-2345']
      sendIssueLink(res)

      expect(res.send).to.have.callCount(2)
      expect(res.send).to.have.been.calledWith(messages.issueLink('RX-1234'))
      expect(res.send).to.have.been.calledWith(messages.issueLink('RX-2345'))
    })

    it('should not send issue link if the link is already part of the message', () => {
      res.match = ['RX-1234', 'RX-2345']
      res.message.text = `Irrelevant text ${messages.issueLink('RX-1234')} and RX-2345`
      sendIssueLink(res)

      expect(res.send).to.have.callCount(1)
      expect(res.send).to.have.been.calledWith(messages.issueLink('RX-2345'))
    })
  })
})

describe('jira hubot script', () => {
  let jira
  let robot

  beforeEach(() => {
    jira = {
      sendIssueLink: sinon.stub(),
    }
    robot = {
      hear: () => {
      },
    }
  })

  describe('hear regex', () => {
    it('should match a single jira issue reference', () => {
      sinon.stub(robot, 'hear', (regex) => {
        const match = 'RX-1234'.match(regex)
        expect(match).to.eql(['RX-1234'])
      })

      hubotScript(robot, jira)
    })

    it('should match multiple jira issue reference', () => {
      sinon.stub(robot, 'hear', (regex) => {
        const match = 'RX-1234RX-2345'.match(regex)
        expect(match).to.eql(['RX-1234', 'RX-2345'])
      })

      hubotScript(robot, jira)
    })

    it('should ignore anything but a jira issue reference', () => {
      sinon.stub(robot, 'hear', (regex) => {
        const match = 'fooRX-1234bar'.match(regex)
        expect(match).to.eql(['RX-1234'])
      })

      hubotScript(robot, jira)
    })
  })
})
