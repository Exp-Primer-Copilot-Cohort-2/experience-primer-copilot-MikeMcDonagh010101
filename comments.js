// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/comments', function(req, res) {
    fs.readFile(__dirname + "/comments.json", 'utf8', function(err, data) {
        console.log(data);
        res.end(data);
    });
});

app.post('/comments', function(req, res) {
    var comment = req.body;
    console.log(comment);
    fs.readFile(__dirname + "/comments.json", 'utf8', function(err, data) {
        data = JSON.parse(data);
        data.push(comment);
        fs.writeFile(__dirname + "/comments.json", JSON.stringify(data), 'utf8', function(err) {
            console.log('Success');
            res.end(JSON.stringify(data));
        });
    });
});

var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server listening at http://%s:%s', host, port);
});