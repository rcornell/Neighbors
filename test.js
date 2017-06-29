const Nightmare = require('nightmare');
const assert = require('assert');


describe('interact with ShareIn user interface', function() {
  this.timeout('30s');

  let nightmare = null;
  beforeEach(() => {
    nightmare = new Nightmare();
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

})