/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect
chai.use(require('sinon-chai'))

const { sendIssueLink } = require('./jira')
const messages = require('./messages')

describe('jira', () => {
  let res

  beforeEach(() => {
    res = {
      send: sinon.stub(),
      match: [],
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
  })
})
