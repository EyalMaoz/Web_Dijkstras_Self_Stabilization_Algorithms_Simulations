var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = 5000;
var fs = require('fs');

app.use(bodyParser.json()); // support json encoded bodies

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname));

app.get('/', function(req, res) {
    fs.readFile("index.html", "UTF-8", function(err, html) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
    });
});
app.get('/utils.js', function(req, res) {
    var fileStream = fs.createReadStream("utils.js", "UTF-8");
    res.writeHead(200, { "Content-Type": "text/css" });
    fileStream.pipe(res);
});
app.get('/main.js', function(req, res) {
    var fileStream = fs.createReadStream("main.js", "UTF-8");
    res.writeHead(200, { "Content-Type": "text/css" });
    fileStream.pipe(res);
});

// start the server
app.listen(process.env.PORT || port);
console.log('Server started!')