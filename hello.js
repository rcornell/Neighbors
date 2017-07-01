// var page = require('webpage').create();
// page.open('http://www.google.com', function(status) {
//   console.log("Status: " + status);
//   if(status === "success") {
//     setTimeout(function() {
//       page.render('example.png');
//       phantom.exit();
//     },3000)
//   } else {
//     phantom.exit();
//   }
  
// });

var WebPage = require('webpage');
page = WebPage.create();
page.onInitialized = function() {
    if(page.injectJs('node_modules/core-js/client/core.js')){
        console.log("Polyfill loaded");
    }    
}
page.open('http://localhost:8080/', function(status) {
  console.log('Status: ' + status);
});

page.onLoadFinished = function() {
        window.setTimeout(function () {
        page.render('example.png');
        phantom.exit();
      }, 5000);
}
page.onError = function() {
  console.log('Error with args: ', JSON.stringify(arguments));
}