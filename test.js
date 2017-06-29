const Nightmare = require('nightmare');
const assert = require('assert');


describe('load the page without errors', function() {
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

})