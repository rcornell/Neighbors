const Nightmare = require('nightmare');
const assert = require('assert');
const expect = require('chai').expect;


describe('interact with ShareIn user interface', function() {
  this.timeout('30s');

  let nightmare = null;
  beforeEach(() => {
    nightmare = new Nightmare({show: true, typeInterval: 100}).viewport(800,600);
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
        .wait(1000)
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
        })
        .catch(done);
    })
  })

  describe('Should interact with user comments', function() {

    it('should leave a comment', function(done) {
      nightmare
        .goto('http://localhost:8080')
        .click('.loginButton')
        .click('.localLoginButton')
        .type('.userEmail', 'rob.cornell@gmail.com')
        .type('.userPassword', 'p')
        .click('.submitLoginButton')
        .wait(500)
        .click('a#gotoProfileButton')
        .wait(1000)
        .click('#react-tabs-2')
        .wait(500)
        .click('.ownerButton')
        .wait(500)
        .type('.commentInput', 'Henry Han is my lord and savior')
        .click('.commentSubmitButton')
        .wait(2000)
        .end()
        .evaluate(function() {
          return document.querySelector('.commentMessage').innerText;
        })
        .then((text) => {
          expect(text).to.equal('Henry Han is my lord and savior');
          done();
        })
        .catch(done);

    });

    it('should edit a comment', function(done) {
      nightmare
        .goto('http://localhost:8080')
        .click('.loginButton')
        .click('.localLoginButton')
        .type('.userEmail', 'rob.cornell@gmail.com')
        .type('.userPassword', 'p')
        .click('.submitLoginButton')
        .wait(500)
        .click('a#gotoProfileButton')
        .wait(1000)
        .click('#react-tabs-2')
        .wait(500)
        .click('.ownerButton')
        .wait(500)
        .click('.editCommentButton')
        .type('.editCommentInput', 'This is a long comment so I have time to talk')
        .click('.submitEditButton')
        .wait(1000)
        .end()
        .evaluate(function() {
          return document.querySelector('.commentMessage').innerText;
        })
        .then((text) => {
          expect(text).to.equal('This is a long comment so I have time to talk');
          done();
        })
        .catch(done);
    });

    it('should delete a comment', function(done) {
      const previousTopComment = '';
      nightmare
        .goto('http://localhost:8080')
        .click('.loginButton')
        .click('.localLoginButton')
        .type('.userEmail', 'rob.cornell@gmail.com')
        .type('.userPassword', 'p')
        .click('.submitLoginButton')
        .wait(500)
        .click('a#gotoProfileButton')
        .wait(1000)
        .click('#react-tabs-2')
        .wait(500)
        .click('.ownerButton')
        .wait(500)
        .evaluate(function() {
          previousTopComment = document.querySelector('.commentMessage').innerText;
        })
        .click('.deleteCommentButton')
        .wait(500)
        .evaluate(function() {
          return document.querySelector('.commentMessage').innerText;
        })
        .then((text) => {
          expect(text).to.not.equal(previousTopComment);
          done();
        })
        .catch(done);
    });


  })

})