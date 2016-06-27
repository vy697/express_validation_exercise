'use strict';

var express = require('express');
var app = express();
var path = require('path');

var pg = require('pg');



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));


app.get('/', function(req, res){
  res.render('home', {});
});

app.get('/signup', function(req, res){
  res.render('signup', {});
});

app.get('/add_post', function(req, res){
  res.render('add_post', {});
});

var port = 3000;
app.listen(port, function(){
  console.log("App listening on: " + port);
});
