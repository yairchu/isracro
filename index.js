var tailcall = require('./libs/tailcall.js');
tailcall();

var main = require('./libs/main.js');
main(x => console.log("Done"));
