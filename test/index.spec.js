/* eslint-disable no-unused-expressions */
const Chance = require('chance')
const Promise = require('bluebird')
const repository = require('./repository')
const User = require('./user')

const chance = Chance()
const expect = require('chai').expect

describe('Bookshelf-deep-changed-plugin', () => {
  'use strict'
  let id
  let existingModel
  before(require('./migration')(repository))

  afterEach(() => {
    return new User({id}).fetch()
      .then((model) => {
        existingModel = model
      })
  })

  it('Should return all false for new model', () => {
    return Promise
      .try(() => {
        return new User().save({name: chance.word(), email: chance.email()})
      })
      .then((model) => {
        id = model.id
        expect(model.get('name_changed_at')).to.be.undefined
        expect(model.get('email_changed_at')).to.be.undefined
      })
  })

  it('Should notice name has changed', () => {
    return Promise.delay(1000)
      .then(() => {
        return new User({id}).save({name: chance.word()})
      })
      .then((model) => {
        expect(model.get('name_changed_at')).to.be.ok
        expect(model.get('name_changed_at')).not.be.eql(existingModel.get('name_changed_at'))
        expect(model.get('email_changed_at')).to.be.undefined
      })
  })

  it('Should notice name has not changed', () => {
    return Promise.delay(1000)
      .then(() => {
        return new User({id}).save({name: existingModel.get('name')})
      })
      .then((model) => {
        expect(model.get('name_changed_at')).to.be.undefined
        expect(model.get('email_changed_at')).to.be.undefined
      })
      .then(() => {
        return new User({id}).fetch()
      })
      .then((model) => {
        expect(model.get('name')).to.be.equal(existingModel.get('name'))
        expect(model.get('email')).to.be.equal(existingModel.get('email'))
        expect(model.get('name_changed_at')).to.be.eql(existingModel.get('name_changed_at'))
        expect(model.get('email_changed_at')).to.be.eql(existingModel.get('email_changed_at'))
        expect(model.get('name_changed_at')).to.be.ok
        expect(model.get('email_changed_at')).to.be.null
      })
  })

  it('Should notice both name and email has changed', () => {
    return Promise.delay(1000)
      .then(() => {
        return new User({id}).save({name: chance.word(), email: chance.email()})
      })
      .then((model) => {
        expect(model.get('name_changed_at')).to.be.ok
        expect(model.get('email_changed_at')).to.be.ok
      })
      .then(() => {
        return new User({id}).fetch()
      })
      .then((model) => {
        expect(model.get('name')).to.not.equal(existingModel.get('name'))
        expect(model.get('email')).to.not.equal(existingModel.get('email'))
        expect(model.get('name_changed_at')).to.not.be.eql(existingModel.get('name_changed_at'))
        expect(model.get('email_changed_at')).to.not.be.eql(existingModel.get('email_changed_at'))
        expect(model.get('name_changed_at')).to.be.ok
        expect(model.get('email_changed_at')).to.be.ok
      })
  })
})
