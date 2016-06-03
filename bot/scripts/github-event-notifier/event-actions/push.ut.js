/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

const sinon = require('sinon')
const chai = require('chai')
const memo = require('memo-is')
const expect = chai.expect
chai.use(require('sinon-chai'))

const messages = require('../messages')
const push = require('./push')

describe('github-event: push', () => {
  let callback
  let data
  const modified = memo().is(() => [])

  beforeEach(() => {
    callback = sinon.stub()
    data = {
      ref: 'refs/heads/my-branch',
      repository: {
        full_name: 'orga/repo',
      },
      commits: [
        {
          modified: modified(),
        },
      ],
    }
  })

  describe('changed shrinkwrap', () => {
    modified.is(() => [
      'somefile.txt',
      'npm-shrinkwrap.json',
      'anotherfile.json',
    ])

    it('should notify', () => {
      const expectedMessage = messages.shrinkwrap('orga/repo')
      push(data, callback)
      expect(callback).to.have.been.calledOnce
      expect(callback).to.have.been.calledWith(expectedMessage)
    })
  })

  describe('unchanged shrinkwrap', () => {
    modified.is(() => [
      'index.js',
    ])

    it('should not notify', () => {
      push(data, callback)
      expect(callback).to.not.have.been.called
    })
  })
})
