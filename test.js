const Nightmare = require('nightmare');
const assert = require('assert');
const expect = require('chai').expect;


describe('interact with ShareIn user interface', function() {
  this.timeout('30s');

  let nightmare = null;
  beforeEach(() => {
    nightmare = new Nightmare({show: true});
  });

  xdescribe('load the page successfully', function() {
    it('should not throw errors on load', function(done) {
      nightmare.goto('http://localhost:8080')
        .end()
        .then(function(result) { done() })
        .catch(done);
    })
  })


  xdescribe('log in to the site', function() {
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

  xdescribe('given bad login data', function() {
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
        })
        .catch(done);
    })
  })

  describe('Should interact with user comments', function() {
    it('should leave a comment', function(done) {
      nightmare.goto('http://localhost:8080')
        .click('.loginButton')
        .click('.localLoginButton')
        .type('.userEmail', 'rob.cornell@gmail.com')
        .type('.userPassword', 'p')
        .click('.submitLoginButton')
        .wait(500)
        .click('a#gotoProfileButton')
        .wait(500)
        // .end()
        // .then(() => { done() })
        .click('#react-tabs-2')
        .click('.ownerButton')
        .wait(500)
        .click('.editCommentButton')
        .type('.editCommentInput', 'Working test')
        .click('.submitEditButton')
        .end()
        .evaluate(function() {
          const item = document.querySelector('.commentMessage');
          console.log('Item: ', item);
          expect(item.innertext).to.equal('Working test');
          done();
        })
        .catch(done);
    })
  })

})