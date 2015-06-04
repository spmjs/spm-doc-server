'use strict';

var express = require('express');
var http = require('http');
var join = require('path').join;
var fs = require('fs');

global.CONFIG = {
  wwwroot: join(__dirname, '../spmjs.io/data')
};

var app = express();
app.set('port', 3002);

app.get('/:name/examples/*', function(req, res, next) {
  if (fs.existsSync(join(CONFIG.wwwroot, 'docs', req.params.name))) {
    res.redirect('/' + req.params.name + '/latest' + '/examples/');
  } else {
    next();
  }
});

app.get('/:name/:version/*', require('./docs'));

app.get('/:name', function(req, res, next) {
  if (fs.existsSync(join(CONFIG.wwwroot, 'docs', req.params.name))) {
    res.redirect('/' + req.params.name + '/latest');
  } else {
    next();
  }
});

app.get('/*', express.static(join(CONFIG.wwwroot, 'docs')));

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

