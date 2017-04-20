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
      path: '/document/d/1qXmd1YjZk88QxhorD0IPgJggRKLD5_5DaGcZlU8nDKw/pub'
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
            var results = main(coder.encode(cache.doc))
            var decode = function(x) {
                x.eng = decoder.decode(x.eng);
                x.heb = decoder.decode(x.heb);
            };
            decode(results.all);
            decode(results.lvl012);
            decode(results.lvl23);
            decode(results.lvl34);
            cache.results = results;
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

app.get('/eng', function(request, response) {
    response.send(cache.results.all.eng);
});

app.get('/heb', function(request, response) {
    response.send(cache.results.all.heb);
});

app.get('/lvl012eng', function(request, response) {
    response.send(cache.results.lvl012.eng);
});

app.get('/lvl012heb', function(request, response) {
    response.send(cache.results.lvl012.heb);
});

app.get('/lvl23eng', function(request, response) {
    response.send(cache.results.lvl23.eng);
});

app.get('/lvl23heb', function(request, response) {
    response.send(cache.results.lvl23.heb);
});

app.get('/lvl34eng', function(request, response) {
    response.send(cache.results.lvl34.eng);
});

app.get('/lvl34heb', function(request, response) {
    response.send(cache.results.lvl34.heb);
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
