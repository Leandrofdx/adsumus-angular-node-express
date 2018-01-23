const express = require('express');
const app = express();
var http = require('http');

var porta = process.env.PORT || 8080;

app.use(express.static(__dirname + '/distx'));

http.createServer(app).listen(porta, function() {
    console.log('App rodando acesso -> http://localhost:'+this.address().port);
});