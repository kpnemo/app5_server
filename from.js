var express = require('express')
var app = express()

var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(express.static(__dirname + '/app_server5'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/app_server5', function (req, res) {
    res.send("hello");
});

app.listen(3000);
   