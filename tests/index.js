'use strict';
var should = require('should'),
  chance = require('chance')(),
  Promise = require('bluebird'),
  repository = require('./repository'),
  User = require('./user'),
  id,
  existingModel;


describe('Bookshelf-deep-changed-plugin', function () {
  before(require('./migration')(repository));

  afterEach(function () {
    return new User({id: id}).fetch()
      .then(function (model) {
        existingModel = model;
      });
  });

  it('Should return all false for new model', function () {

    return Promise.resolve()
      .then(function () {
        return new User().save({name: chance.word(), email: chance.email()});
      })
      .then(function (model) {
        id = model.id;
        should(model.get('name_changed_at')).be.equal(undefined);
        should(model.get('email_changed_at')).be.equal(undefined);
      });
  });

  it('Should notice name has changed', function () {
    return Promise.delay(1000)
      .then(function () {
        return new User({id: id}).save({name: chance.word()});
      })
      .then(function (model) {
        should.exist(model.get('name_changed_at'));
        should(model.get('name_changed_at')).not.be.eql(existingModel.get('name_changed_at'));
        should(model.get('email_changed_at')).equal(undefined);
      });
  });

  it('Should notice name has not changed', function () {
    return Promise.delay(1000)
      .then(function () {
        return new User({id: id}).save({name: existingModel.get('name')});
      })
      .then(function (model) {
        should(model.get('name_changed_at')).equal(undefined);
        should(model.get('email_changed_at')).equal(undefined);
      })
      .then(function () {
        return new User({id: id}).fetch();
      })
      .then(function (model) {
        should(model.get('name')).equal(existingModel.get('name'));
        should(model.get('email')).equal(existingModel.get('email'));
        should(model.get('name_changed_at')).be.eql(existingModel.get('name_changed_at'));
        should(model.get('email_changed_at')).be.eql(existingModel.get('email_changed_at'));
        should.exist(model.get('name_changed_at'));
        should.not.exist(model.get('email_changed_at'));
      });
  });

  it('Should notice both name and email has changed', function () {
    return Promise.delay(1000)
      .then(function () {
        return new User({id: id}).save({name: chance.word(), email: chance.email()});
      })
      .then(function (model) {
        should.exist(model.get('name_changed_at'));
        should.exist(model.get('email_changed_at'));
      })
      .then(function () {
        return new User({id: id}).fetch();
      })
      .then(function (model) {
        should(model.get('name')).not.equal(existingModel.get('name'));
        should(model.get('email')).not.equal(existingModel.get('email'));
        should(model.get('name_changed_at')).not.be.eql(existingModel.get('name_changed_at'));
        should(model.get('email_changed_at')).not.be.eql(existingModel.get('email_changed_at'));
        should.exist(model.get('name_changed_at'));
        should.exist(model.get('email_changed_at'));
      });
  });

});
