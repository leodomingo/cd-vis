var express = require('express');
var app = express();
var d3 = require("d3");
var morgan = require('morgan');
var path = require("path");
http = require('http');
app.use(express.static(__dirname));                       // set the static files location /public/img will be /img for users
app.use(morgan('dev'));   

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.get('/downballot', function(req,res){
	res.sendFile(path.join(__dirname, '/downballot.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

//static files 
app.use('/scripts', express.static(__dirname + '/node_modules/'));
