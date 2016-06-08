var tailcall = require('./libs/tailcall.js');
tailcall();

var express = require('express');
var https = require("https");
var encoding = require('text-encoding');
var main = require('./libs/main.js');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var cache = {doc: 'getting'}

var update_doc = function() {
    var options = {
      host: 'docs.google.com',
      port: 443,
      path: '/document/d/1vMFIUDE61TAzxZ-4D36gKlsddAd4XTB05ci0fh81bhY/pub'
    };
    https.get(options, function(res) {
        res.setEncoding("utf8");
        var content = "";
        res.on("data", function (chunk) {
            content += chunk;
        });
        res.on("end", function () {
            cache.doc = content;

            var coder = new encoding.TextEncoder();
            var decoder = new encoding.TextDecoder();
            cache.parsed = main.parse(coder.encode(cache.doc));
            cache.brief = decoder.decode(main.makeBrief(cache.parsed));
            cache.detailed = decoder.decode(main.makeDetailed(cache.parsed));
        });
    });
};
update_doc();

app.get('/update', function(request, response) {
    update_doc();
    response.send(cache.doc);
});

app.get('/source', function(request, response) {
    response.send(cache.doc);
});

app.get('/brief', function(request, response) {
    response.send(cache.brief);
});

app.get('/details', function(request, response) {
    response.send(cache.detailed);
});

app.get('/', function(request, response) {
    response.send(cache.brief);
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
