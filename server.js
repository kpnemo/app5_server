var fs = require('fs');
var express = require('express');
var app = express();

app.get('/*\.(css|js)/', function(req, res){
	var fileType = null;
	var myFilePath = req.url;
	var myfile = fs.readFile('../app2' + myFilePath, {encoding: 'UTF-8'}, function(err, data){
		if(myFilePath.indexOf('css') != -1) fileType = 'css';
		if(myFilePath.indexOf('js') != -1) fileType = 'js';

		res.type(fileType).send(data);
	});
});

app.get('/game', function(req, res){
	var myfile = fs.readFile('../app2/tic_tac_toe.html', {encoding: 'UTF-8'}, function(err, data){
		res.send(data);
		//console.log(data);
	});
});


app.use('/ttc', express.static('../app2'));

app.listen(3000, function () {
	console.log('Example app listening on port 3000!')
})