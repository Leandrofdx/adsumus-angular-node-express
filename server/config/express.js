var express = require('express')
    ,app = express()
    ,bodyParser = require('body-parser')
    ,routes = require('../app/routes')
    ,path =  require('path');

 var cors = require('cors')
 app.use(cors())

app.set('clientPath', path.join(__dirname, '../..', '/'));
console.log(app.get('clientPath'));
app.use(express.static(app.get('clientPath')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* Cors */

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-XSRF-TOKEN, Content-Type, Accept");
    next();
});

routes(app);

module.exports = app;