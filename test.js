const Nightmare = require('nightmare');
const assert = require('assert');
const expect = require('chai').expect;


describe('interact with ShareIn user interface', function() {
  this.timeout('30s');

  let nightmare = null;
  beforeEach(() => {
    nightmare = new Nightmare({show: true});
  });

  describe('load the page successfully', function() {
    it('should not throw errors on load', function(done) {
      nightmare.goto('http://localhost:8080')
        .end()
        .then(function(result) { done() })
        .catch(done);
    })
  })


  describe('log in to the site', function() {
    it('should click the login button and enter credentials', function(done) {
      nightmare.goto('http://localhost:8080')
        .click('.loginButton')
        .click('.localLoginButton')
        .type('.userEmail', 'rob.cornell@gmail.com')
        .type('.userPassword', 'p')
        .click('.submitLoginButton')
        .wait(500)
        .click('.logoutButton')
        .end()
        .then(function(result) { done() })
        .catch(done);
    })
  })

  describe('given bad login data', function() {
    it('should fail to log in', function(done) {
      nightmare.goto('http://localhost:8080')
        .click('.loginButton')
        .click('.localLoginButton')
        .type('.userEmail', 'admiral.adama@gmail.com')
        .type('.userPassword', 'starbuckPlzStop')
        .click('.submitLoginButton')
        .wait(500)
        .visible('.loginFailedAlert')
        .end()
        .then((result) => {
          expect(result).to.be.true;
          done();
        });
    })
  })

})