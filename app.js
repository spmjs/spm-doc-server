'use strict';

var express = require('express');
var http = require('http');
var join = require('path').join;

global.CONFIG = {
  wwwroot: join(__dirname, '../spmjs.io/data')
};

var app = express();
app.set('port', 3001);

app.get('/:name/:version/*', require('./docs'));
app.get('/*', express.static(join(CONFIG.wwwroot, 'docs')));

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

