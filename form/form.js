var express = require('express');
var app = express();


var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/profile', upload.array(), function (req, res, next) {
    console.log(req.body);
    res.json(req.body);
});


app.get('/form_simple', function(req, res){
    res.send('hello world');
});

app.use('/simple_form', express.static('/form'));

app.listen(3000);