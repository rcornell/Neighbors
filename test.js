const Nightmare = require('nightmare');
const assert = require('assert');
const expect = require('chai').expect;


describe('interact with ShareIn user interface', function() {
  this.timeout('30s');

  let nightmare = null;
  beforeEach(() => {
    nightmare = new Nightmare({show: true, typeInterval: 100}).viewport(800,600);
  });

  xdescribe('load the page successfully', function() {
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

    xit('should leave a comment', function(done) {
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

    xit('should edit a comment', function(done) {
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

    xit('should delete a comment', function(done) {
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


    //BORROW AND RETURN

    it('should borrow an item and add it to your "borrowed" items', function(done) {
      nightmare
        .goto('http://localhost:8080')
        .click('.loginButton')
        .click('.localLoginButton')
        .type('.userEmail', 'borrower@gmail.com')
        .type('.userPassword', 'p')
        .click('.submitLoginButton')
        .wait(500)
        .type('.searchInput', 'Pikachu')
        .type('.zipInput', '11217')
        .click('.searchButton')
        .wait(2000)
        .click('.borrowButton')
        .wait(2000)
        .click('a#gotoProfileButton')
        .wait(1000)
        .click('#react-tabs-2')
        .wait(500)
        .evaluate(function() {
          return document.querySelectorAll('.borrowedItemTitle').map(node => node.innerText);
        })
        .then((textArray) => {
          expect(textArray.includes('Pikachu')).to.be.true;
          done();
        })
        .catch(done)
    });

    it('should confirm that an item was returned to the owner', function(done) {
      nightmare
        .goto('http://localhost:8080')
        .click('.loginButton')
        .click('.localLoginButton')
        .type('.userEmail', 'skicut99@aol.com')
        .type('.userPassword', 'p')
        .click('.submitLoginButton')
        .wait(500)
        .click('a#gotoProfileButton')
        .wait(1000)
        .click('.returnItemButton')
        .wait(1000)
        .end()
        .then((result) => { done() })
        .catch(done);
    });

    //BORROW, RETURN AND REVIEW
    it('should borrow an item and add it to your "borrowed" items', function(done) {
      nightmare
        .goto('http://localhost:8080')
        .click('.loginButton')
        .click('.localLoginButton')
        .type('.userEmail', 'borrower@gmail.com')
        .type('.userPassword', 'p')
        .click('.submitLoginButton')
        .wait(500)
        .type('.searchInput', 'Pikachu')
        .type('.zipInput', '11217')
        .click('.searchButton')
        .wait(2000)
        .click('.borrowButton')
        .wait(2000)
        .click('a#gotoProfileButton')
        .wait(1000)
        .click('#react-tabs-2')
        .wait(500)
        .evaluate(function() {
          return document.querySelectorAll('.borrowedItemTitle').map(node => node.innerText);
        })
        .then((textArray) => {
          expect(textArray.includes('Pikachu')).to.be.true;
          done();
        })
        .catch(done);
    });

    it('should confirm that an item was returned to the owner', function(done) {
      nightmare
        .goto('http://localhost:8080')
        .click('.loginButton')
        .click('.localLoginButton')
        .type('.userEmail', 'skicut99@aol.com')
        .type('.userPassword', 'p')
        .click('.submitLoginButton')
        .wait(500)
        .click('a#gotoProfileButton')
        .wait(1000)
        .click('.returnItemButton')
        .wait(1500)
        .click('img.icon')
        .wait(1500)
        .type('.commentInput', 'Test review')
        .click('.commentSubmitButton')
        .wait(1500)
        .end()
        .then((result) => {done()})
        .catch(done);
    });


    it('should have reviews that were submitted by modal', function(done) {
      nightmare
        .goto('http://localhost:8080')
        .click('.loginButton')
        .click('.localLoginButton')
        .type('.userEmail', 'borrower@gmail.com')
        .type('.userPassword', 'p')
        .click('.submitLoginButton')
        .wait(500)
        .type('.searchInput', 'Pikachu')
        .type('.zipInput', '11217')
        .click('.searchButton')
        .wait(2000)
        .click('.borrowButton')
        .wait(2000)
        .click('a#gotoProfileButton')
        .wait(1000)
        .evaluate(() => {
          const obj = {};
            obj.message = document.querySelector('.commentMessage').innerText;
            obj.username = document.querySelector('.commentSubmitter').innerText;
          return obj;
        })
        .then(obj => {
          expect(obj.message).to.equal('Test review');
          expect(obj.username).to.equal('First Person');
          done();
        })
        .catch(done);
    });

  })

})