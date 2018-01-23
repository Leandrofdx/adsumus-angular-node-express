var http = require('http')
    ,app = require('./config/express')
    db = require('./config/database');

var porta = 3000; //process.env.PORT || 8080

http.createServer(app).listen(porta, function() {
    console.log('Servidor rodando na porta :' + this.address().port);
});

 app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return next();
  });

