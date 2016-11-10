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
  const ref = memo().is(() => 'refs/heads/master')

  beforeEach(() => {
    callback = sinon.stub()
    data = {
      ref: ref(),
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

  describe('changed yarn.lock', () => {
    modified.is(() => [
      'somefile.txt',
      'yarn.lock',
      'anotherfile.json',
    ])

    it('should notify', () => {
      const expectedMessage = messages.yarnLock('orga/repo')
      push(data, callback)
      expect(callback).to.have.been.calledOnce
      expect(callback).to.have.been.calledWith(expectedMessage)
    })
  })

  describe('unchanged yarn.lock', () => {
    modified.is(() => [
      'index.js',
    ])

    it('should not notify', () => {
      push(data, callback)
      expect(callback).to.not.have.been.called
    })
  })

  describe('changed yarn.lock on non-master branch', () => {
    modified.is(() => [
      'yarn.lock',
    ])
    ref.is(() => 'refs/heads/other-branch')
    it('should not notify', () => {
      push(data, callback)
      expect(callback).to.not.have.been.called
    })
  })

  describe('changed docker-dev/Dockerfile', () => {
    modified.is(() => [
      'somefile.txt',
      'docker-dev/Dockerfile',
      'anotherfile.json',
    ])

    it('should notify', () => {
      const expectedMessage = messages.dockerfile('orga/repo')
      push(data, callback)
      expect(callback).to.have.been.calledOnce
      expect(callback).to.have.been.calledWith(expectedMessage)
    })
  })

  describe('unchanged docker-dev/Dockerfile', () => {
    modified.is(() => [
      'somefile.txt',
      'anotherfile.json',
    ])

    it('should not notify', () => {
      push(data, callback)
      expect(callback).to.not.have.been.called
    })
  })

  describe('changed yarn.lock and docker-dev/Dockerfile', () => {
    modified.is(() => [
      'yarn.lock',
      'docker-dev/Dockerfile',
    ])

    it('should notify both', () => {
      const expectedMessageYarnLock = messages.yarnLock('orga/repo')
      const expectedMessageDockerfile = messages.dockerfile('orga/repo')
      push(data, callback)
      expect(callback).to.have.been.calledTwice
      expect(callback).to.have.been.calledWith(expectedMessageYarnLock)
      expect(callback).to.have.been.calledWith(expectedMessageDockerfile)
    })
  })
})
