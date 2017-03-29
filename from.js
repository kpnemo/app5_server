var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var exampleDB = require('./modules/file_handler_example');

var upload = multer();
var app = express();

app.use(express.static(__dirname + '/form'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/', function (req, res, next) {
	var data = req.body;
	if(exampleDB.addData(data)) {
		res.redirect('/?submited=true');
	} else {
		res.redirect('/?submited=false');
	}
});

app.get('/getExample_1', function(req, res){
	res.status(200).json(exampleDB.getData());
});

app.listen(3100);