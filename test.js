const Nightmare = require('nightmare');
const assert = require('assert');
const expect = require('chai').expect;


describe('', function() {
  this.timeout('25s');

  let nightmare = null;
  beforeEach(() => {
    nightmare = new Nightmare({show: true, typeInterval: 100}).viewport(800,600);
  });

  describe('Load the page successfully: ', function() {
    it('should not throw errors on load', function(done) {
      nightmare.goto('http://localhost:8080')
        .end()
        .then(function(result) { done() })
        .catch(done);
    })
  })


  describe('Log in to the site: ', function() {
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

  describe('Given bad login data: ', function() {
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

  describe('Interact with user comments: ', function() {

    it('should find the submit button', function(done) {
      nightmare
        .on('console', function(type, input, message) {
          console.log(input, message);
        })
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
        .visible('button.commentSubmitButton')
        .then((result) => {
          expect(result).to.be.true;
          done();
        })
        .catch(done);
    });

    it('should leave a comment', function(done) {
      nightmare
        .on('console', function(type, input, message) {
          console.log(input, message);
        })
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
        .wait(1000)
        .type('.commentInput', 'Henry!')
        .click('button.commentSubmitButton')
        // .evaluate(function() {
        //   return document.querySelector('.commentMessage').innerText;
        // })
        // .then((text) => {
        //   expect(text).to.equal('Henry!');
        //   done();
        // })
        .then((result) => { done() })
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

  xdescribe('Borrow and review items: ', function() {

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
        .wait(4000)
        .click('.borrowButton')
        .wait(2000)
        .click('a#gotoProfileButton')
        .wait(1000)
        .click('#react-tabs-2')
        .wait(500)
        .evaluate(function() {
          return Array.from(document.querySelectorAll('.borrowedItemTitle')).map(node => node.innerText);
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
        .wait(2000)
        .click('.returnItemButton')
        .wait(2000)
        .click('.modal-body span span span')
        .wait(2000)
        .visible('.returnItemButton')
        .end()
        .then((result) => { 
          expect(result).to.be.false;
          done() 
        })
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
        .wait(4000)
        .click('.borrowButton')
        .wait(2000)
        .click('a#gotoProfileButton')
        .wait(1000)
        .click('#react-tabs-2')
        .wait(500)
        .evaluate(function() {
          return Array.from(document.querySelectorAll('.borrowedItemTitle')).map(node => node.innerText);
        })
        .then((textArray) => {
          expect(textArray.includes('Pikachu')).to.be.true;
          done();
        })
        .catch(done)
    });

    it('should confirm that an item was returned to the owner', function(done) {
      nightmare
        .on('console', function(type, input, message) {
          console.log(input, message);
        })
        .goto('http://localhost:8080')
        .click('.loginButton')
        .click('.localLoginButton')
        .type('.userEmail', 'skicut99@aol.com')
        .type('.userPassword', 'p')
        .click('.submitLoginButton')
        .wait(500)
        .click('a#gotoProfileButton')
        .wait(3000)
        .click('.returnItemButton')
        .wait(1000)  
        .type('.commentInput', 'Test review')
        .click('.commentModalSubmitButton')
        .wait(2000)
        .click('.modal-body span span span')
        .wait(2000)
        .visible('.returnItemButton')
        .end()
        .then((result) => { 
          expect(result).to.be.false;
          done() 
        })
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